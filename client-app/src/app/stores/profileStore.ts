import { makeAutoObservable, runInAction } from "mobx";
import { Photo, Profile, ProfileFormValues } from "../models/profile";
import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get IsCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.uploading = false));
    }
  };

  setMainPhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((p) => p.isMain)!.isMain = false;
          this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos = this.profile.photos.filter((p) => p.id !== photo.id);
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  update = async (profile: ProfileFormValues) => {
    this.loading = true;
    try {
      var result = await agent.Profiles.update(profile);
      runInAction(() => {
        if (this.profile) {
          this.profile.displayName = result.displayName;
          this.profile.bio = result.bio;
        }
        if (store.userStore.user) {
          store.userStore.user.displayName = result.displayName;
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };
}

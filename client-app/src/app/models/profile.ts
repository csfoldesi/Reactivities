import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}

export class ProfileFormValues {
  displayName: string = "";
  bio?: string = "";

  constructor(profile: Profile) {
    this.displayName = profile.displayName;
    this.bio = profile.bio;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

import React, { useState } from "react";
import { Profile } from "../../app/models/profile";
import { Button, Container, Grid, Header, TabPane } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileEditForm from "./ProfileEditForm";

interface Props {
  profile: Profile;
}

export default function ProfileAbout({ profile }: Props) {
  const {
    profileStore: { IsCurrentUser },
  } = useStore();
  const [editMode, setEditMode] = useState(false);

  return (
    <TabPane>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header floated="left" icon="user" content={profile.displayName} />
            {IsCurrentUser && (
              <Button
                floated="right"
                basic
                content={editMode ? "Cancel" : "Edit"}
                onClick={() => setEditMode(!editMode)}
              />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Container>
              {editMode ? (
                <ProfileEditForm profile={profile} setEditMode={setEditMode} />
              ) : (
                <p style={{ whiteSpace: "pre-wrap" }}>{profile.bio}</p>
              )}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </TabPane>
  );
}

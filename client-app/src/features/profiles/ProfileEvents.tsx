import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect } from "react";
import { Card, Image, Grid, Header, Tab, TabPane, TabProps } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { UserActivity } from "../../app/models/profile";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const panes = [
  {
    menuItem: "Next events",
    pane: { key: "next" },
  },
  {
    menuItem: "Past events",
    pane: { key: "past" },
  },
  {
    menuItem: "Hosting",
    pane: { key: "hosting" },
  },
];

export default observer(function ProfileEvents() {
  const { profileStore } = useStore();
  const { loadUserActivities, profile, loadingActivities, userActivities } = profileStore;

  useEffect(() => {
    loadUserActivities(profile!.username, "next");
  }, [loadUserActivities, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserActivities(profile!.username, panes[data.activeIndex as number].pane.key);
  };

  return (
    <TabPane loading={loadingActivities}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header floated="left" icon="calendar" content="Events" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={panes}
              onTabChange={(e, data) => handleTabChange(e, data)}
            />
            <br />
            <Card.Group itemsPerRow={4}>
              {userActivities.map((activity: UserActivity) => (
                <Card as={Link} to={`/activities/${activity.id}`} key={activity.id}>
                  <Image
                    src={`/assets/categoryImages/${activity.category}.jpg`}
                    style={{ minHeight: 100, objectFit: "cover" }}
                  />
                  <Card.Content>
                    <Card.Header textAlign="center">{activity.title}</Card.Header>
                    <Card.Meta textAlign="center">
                      <div>{format(new Date(activity.date), "do LLL")}</div>
                      <div>{format(new Date(activity.date), "h:mm a")}</div>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </TabPane>
  );
});

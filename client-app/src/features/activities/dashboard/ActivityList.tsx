import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemExtra,
  ItemGroup,
  ItemHeader,
  ItemMeta,
  Label,
  Segment,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function ActivityList() {
  const [target, setTarget] = useState("");

  const { activityStore } = useStore();
  const { activitiesByDate: activities, deleteActivity, loading } = activityStore;

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <ItemGroup divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <ItemContent>
              <ItemHeader as="a">{activity.title}</ItemHeader>
              <ItemMeta>{activity.date}</ItemMeta>
              <ItemDescription>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </ItemDescription>
              <ItemExtra>
                <Button as={Link} to={`/activities/${activity.id}`} floated="right" color="blue">
                  View
                </Button>
                <Button
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated="right"
                  color="red"
                  loading={loading && target === activity.id}
                  name={activity.id}
                >
                  Delete
                </Button>
                <Label basic>{activity.category}</Label>
              </ItemExtra>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </Segment>
  );
});

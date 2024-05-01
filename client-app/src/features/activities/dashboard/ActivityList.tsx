import React, { SyntheticEvent, useState } from "react";
import { Activity } from "../../../modules/activity";
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
interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: Props) {
  const [target, setTarget] = useState("");

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
                <Button onClick={() => selectActivity(activity.id)} floated="right" color="blue">
                  View
                </Button>
                <Button
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated="right"
                  color="red"
                  loading={submitting && target === activity.id}
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
}

import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, FormInput, FormTextArea, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  function handleSubmit() {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <FormInput placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <FormTextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <FormInput placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        <FormInput placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} type="date" />
        <FormInput placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        <FormInput placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
        <Button floated="right" positive type="submit" loading={loading}>
          Submit
        </Button>
        <Button floated="right" type="button" as={Link} to="/activities">
          Cancel
        </Button>
      </Form>
    </Segment>
  );
});

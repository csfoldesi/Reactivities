import React, { useEffect, useState } from "react";
import { Button, Segment, Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/options/CategoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The description title is required"),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  let navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Header sub color="teal">
        Activity Details
      </Header>
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput placeholder="Title" name="title" />
            <TextArea placeholder="Description" name="description" rows={3} />
            <SelectInput placeholder="Category" name="category" options={categoryOptions} />
            <DateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header sub color="teal">
              Location Details
            </Header>
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              floated="right"
              positive
              type="submit"
              loading={loading}
            >
              Submit
            </Button>
            <Button floated="right" type="button" as={Link} to="/activities">
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});

import React from "react";
import { Profile, ProfileFormValues } from "../../app/models/profile";
import { Button, Form, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../app/common/form/TextInput";
import TextArea from "../../app/common/form/TextArea";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
  profile: Profile;
  setEditMode: (editmode: boolean) => void;
}

export default observer(function ProfileEditForm({ profile, setEditMode }: Props) {
  const {
    profileStore: { update },
  } = useStore();

  const validationSchema = Yup.object({
    displayName: Yup.string().required("The display name is required"),
  });

  function handleFormSubmit(profile: ProfileFormValues) {
    update(profile).then(() => setEditMode(false));
  }

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={new ProfileFormValues(profile)}
        onSubmit={(values) => handleFormSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput placeholder="Display name" name="displayName" />
            <TextArea placeholder="Bio" name="bio" rows={5} />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              floated="right"
              positive
              type="submit"
              loading={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});

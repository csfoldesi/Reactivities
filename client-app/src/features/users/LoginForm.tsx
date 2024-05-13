import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import TextInput from "../../app/common/form/TextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore.login(values).catch((error) => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="odd">
          <Header as="h2" color="teal" textAlign="center">
            Login to Reactivities
          </Header>
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label style={{ marginBottom: 10 }} basic color="red">
                {errors.error}
              </Label>
            )}
          />
          <Button positive type="submit" fluid loading={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
});

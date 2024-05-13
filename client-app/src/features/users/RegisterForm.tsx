import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import TextInput from "../../app/common/form/TextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ displayName: "", username: "", email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) => userStore.register(values).catch((error) => setErrors({ error: error }))}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="odd">
          <Header as="h2" color="teal" textAlign="center">
            Sign up to Reactivities
          </Header>
          <TextInput name="displayName" placeholder="Display Name" />
          <TextInput name="username" placeholder="Username" />
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage name="error" render={() => <ValidationErrors errors={errors.error} />} />
          <Button positive type="submit" fluid loading={isSubmitting} disabled={!isValid || isSubmitting}>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
});

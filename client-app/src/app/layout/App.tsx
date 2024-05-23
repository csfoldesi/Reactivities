import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import { Container } from "semantic-ui-react";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/" element={<Layout />}>
          <Route path="activities" Component={ActivityDashboard} />
          <Route path="activities/:id" Component={ActivityDetails} />
          <Route path="createActivity" Component={ActivityForm} key={location.key} />
          <Route path="manage/:id" Component={ActivityForm} key={location.key} />
          <Route path="/profiles/:username" Component={ProfilePage} />
          <Route path="/errors" Component={TestErrors} />
          <Route path="/server-error" Component={ServerError} />
          <Route path="/login" Component={LoginForm} />
          <Route path="*" Component={NotFound} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);

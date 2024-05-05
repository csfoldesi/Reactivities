import React from "react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import { Container } from "semantic-ui-react";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/" element={<Layout />}>
          <Route path="activities" Component={ActivityDashboard} />
          <Route path="activities/:id" Component={ActivityDetails} />
          <Route path="createActivity" Component={ActivityForm} key={location.key} />
          <Route path="manage/:id" Component={ActivityForm} key={location.key} />
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

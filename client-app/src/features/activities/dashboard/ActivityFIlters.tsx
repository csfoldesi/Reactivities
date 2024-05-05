import React from "react";
import Calendar from "react-calendar";
import { Header, Icon, Menu } from "semantic-ui-react";

export default function ActivityFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header attached color="teal">
          <Icon name="filter" />
          <Header.Content>Filters</Header.Content>
        </Header>
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header></Header>
      <Calendar />
    </>
  );
}

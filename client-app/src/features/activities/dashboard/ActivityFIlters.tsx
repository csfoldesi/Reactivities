import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Header, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header attached color="teal">
          <Icon name="filter" />
          <Header.Content>Filters</Header.Content>
        </Header>
        <Menu.Item content="All Activities" active={predicate.has("all")} onClick={() => setPredicate("all", "true")} />
        <Menu.Item
          content="I'm going"
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
        />
        <Menu.Item
          content="I'm hosting"
          active={predicate.has("isHosting")}
          onClick={() => setPredicate("isHosting", "true")}
        />
      </Menu>
      <Header></Header>
      <Calendar
        onChange={(date) => setPredicate("startDate", date as Date)}
        value={predicate.get("startDate") || new Date()}
      />
    </>
  );
});

import React from "react";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to="/">
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item name="Errors" as={NavLink} to="/errors" />
        <Menu.Item>
          <Button positive as={NavLink} to="/createActivity">
            Create Activity
          </Button>
        </Menu.Item>
        <Menu.Item position="right">
          <Image src={user?.image || "/assets/user.png"} avatar spaced="right" />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} icon="user" text="My profile" />
              <Dropdown.Item onClick={logout} icon="power" text="Logout" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});

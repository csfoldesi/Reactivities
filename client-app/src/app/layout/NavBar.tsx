import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header as={NavLink} to="/">
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
          Reactivities
        </MenuItem>
        <MenuItem name="Activities" as={NavLink} to="/activities" />
        <MenuItem name="Errors" as={NavLink} to="/errors" />
        <MenuItem>
          <Button positive as={NavLink} to="/createActivity">
            Create Activity
          </Button>
        </MenuItem>
      </Container>
    </Menu>
  );
}

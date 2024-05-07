import React from "react";
import { useStore } from "../../app/stores/store";
import { Container, Header, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

export default observer(function SeverError() {
  const { commonStore } = useStore();

  return (
    <Container>
      <Header as="h1">Server Error</Header>
      <Header sub as="h5" color="red">
        {commonStore.error?.message}
      </Header>
      {commonStore.error?.details && (
        <Segment>
          <Header as="h4" color="teal">
            Stack trace
          </Header>
          <code style={{ marginTop: "10px" }}>{commonStore.error.details}</code>
        </Segment>
      )}
    </Container>
  );
});

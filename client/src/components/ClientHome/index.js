import React, { useState } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  ListGroup,
  Button,
  // Modal,
} from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const ClientHome = () => {
  const client = useState();
  const { data } = useQuery(QUERY_ME);
  const userData = data?.me || [];
  if (!client) {
    return <h3>Must be logged in</h3>;
  }
  console.log(userData.events);
  return (
    <div>
          <>
          <Jumbotron fluid className="text-light bg-dark">
            <Container>
              <h1>Viewing client home</h1>
            </Container>
          </Jumbotron>
          <Container>
            <h2>
              {userData.events?.length
                ? `Viewing ${userData.events.length} saved ${
                    userData.events.length === 1 ? "event" : "events"
                  }:`
                : "You have no events!"}
            </h2>
            <CardColumns>
              {userData.events?.map((event) => {
                return (
                  <Card key={event.name} border="dark">
                    <Card.Body>
                      <Card.Title><h2>{event.name}</h2></Card.Title>
                      {/* {console.log(tier.permissions)} */}
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
        </>
    </div>
  );
};

export default ClientHome;

import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
  ListGroup,
  // Modal,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { REMOVE_EVENT, ADD_EVENT } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";

const EventsList = ({ events, tiers }) => {
  const [removeEvent] = useMutation(REMOVE_EVENT);
  const [addEventToUser] = useMutation(ADD_EVENT);
  const { loading } = useQuery(QUERY_EVENT);
  console.log(events.tiers);
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleremoveEvent = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removeEvent({
        variables: { eventId: eventId },
      });
      console.log(eventId);
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // const handleAddToEvent = async (tierId, eventId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }
  //   try {
  //     const { data } = await addTierToEvent({
  //       variables: { tierId: tierId, eventId: eventId },
  //     });
  //     console.log(data);
  //     return data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing events!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {console.log(events)}
          {events?.length
            ? `Viewing ${events.length} saved ${
                events.length === 1 ? "event" : "events"
              }:`
            : "You have no events!"}
        </h2>
        <CardColumns>
          {events?.map((event) => {
            return (
              <Card key={event.accessArea} border="dark">
                <Card.Body>
                  <Card.Title><h2>{event.name}</h2></Card.Title>
                  <Card.Text>
                    {event.tiers.map((tier) => (
                        <ListGroup>
                          {tier.tierName}
                        </ListGroup>
                    ))}
                  </Card.Text>
                  <Button
                    className="btn-block btn-dark"
                    // onClick={() => handleAddToEvent(tier._id)}
                  >
                    Add tiers to this event!
                  </Button>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => {
                      handleremoveEvent(event._id);
                      window.location.reload();
                    }}
                  >
                    Delete this event!
                  </Button>

                  {/* <Button
                    className="btn-block btn-success"
                    onClick={() => handleEditEvent(event.name)}
                  >
                    Edit this event!
                  </Button> */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
export default EventsList;

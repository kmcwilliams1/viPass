import React, {Component} from "react";
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
import PermissionModal from "../PermissionModal/PermissionModal";
import EventsModal from "../EventsModal/EventsModal";

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

const HandleRemoveEvent =  () => {
  const [removeEvent] = useMutation(REMOVE_EVENT);
  return async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const {data} = await removeEvent({
        variables: {eventId: eventId},
      });
      console.log(eventId);
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
}

export default class EventsList extends Component {

  // create function that accepts the book's mongo _id value as param and deletes the book from the database

  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    }
    this.hideShowModal = this.hideShowModal.bind(this)
  }

  hideShowModal() {
    this.setState(prevState => ({
      modalShow: !prevState.modalShow
    }))
  }


  render() {
    const eventsLength = this.props.events?.data?.length
// console.log(this.props.events)
    // if data isn't here yet, say so
    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h1>Viewing events!</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {eventsLength
              ? `Viewing  saved events`

              : "You have no events!"}
          </h2>
          <CardColumns>
            {this.props.events?.data?.events?.map((event) => {
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
                      onClick={this.hideShowModal}
                    >
                      Add tiers to this event!
                    </Button>
                    {this.state.modalShow
                    && <EventsModal
                      event={event.name}
                      apolloClient={this.props.apolloClient}
                      currentUser={this.props.currentUser}
                      permissions={this.props.permissions}
                      tiers={this.props.tiers}
                      events={this.props.events}
                      admins={this.props.admins}
                      show={this.hideShowModal}
                      onHide={this.hideShowModal}
                    />}
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => {
                        HandleRemoveEvent(event._id);

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
}

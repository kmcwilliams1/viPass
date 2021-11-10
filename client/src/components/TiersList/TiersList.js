import React, {Component} from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  ListGroup,
  Button
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import {REMOVE_TIER, ADD_TIER, REMOVE_PERMISSION} from "../../utils/mutations";
import { QUERY_TIER } from "../../utils/queries";
import TiersModal from "../TiersModal/TiersModal";
// const [removeTier] = useMutation(REMOVE_TIER);
// const [addTierToEvent] = useMutation(ADD_TIER)

function HandleDeleteTier () {
  const [removeTier] = useMutation(REMOVE_TIER);
  return async (tierId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const {data} = await removeTier({
        variables: {tierId: tierId},
      });
      console.log(tierId);
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
}



export default class TierList extends Component  {
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
    const tiersLength = this.props.tiers?.data?.tiers?.length

    // create function that accepts the book's mongo _id value as param and deletes the book from the database


    // const handleAddToUser = async (accessArea, tierId) => {
    //   const token = Auth.loggedIn() ? Auth.getToken() : null;
    //   if (!token) {
    //     return false;
    //   }
    //   try {
    //     const { data } = await addEventToUser({
    //       variables: { accessArea: accessArea, tierId: tierId },
    //     });
    //     console.log(data);
    //     return data;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // if data isn't here yet, say so
    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h1>Viewing tiers</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {tiersLength
              ? `Viewing saved tiers`
              : "You have no tiers!"}
          </h2>
          <CardColumns>
            {this.props.tiers?.data?.tiers?.map((tier) => {
              return (
                <Card key={tier.tierName} border="dark">
                  <Card.Title><h2>{tier.tierName}</h2></Card.Title>
                  <Card.Body>
                    {/* {console.log(tier.permissions)} */}
                    <Card.Text>
                      {tier.permissions.map((permission) => (
                        <ListGroup>
                          {permission.accessArea}
                        </ListGroup>
                      ))}
                    </Card.Text>
                    <Button
                      className="btn-block btn-dark"
                      onClick={this.hideShowModal}
                    >
                    Assign to User!
                  </Button>
                  {this.state.modalShow
                  && <TiersModal
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
                        HandleDeleteTier(tier._id);
                        window.location.reload();
                      }}
                    >
                      Delete this tier!
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      </>
    );
  }
};



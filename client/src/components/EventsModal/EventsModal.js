import {Button, Modal} from "react-bootstrap";
import React, {Component} from "react";
import Auth from "../../utils/auth";
import {ADD_TIER_TO_EVENT} from "../../utils/mutations";
// create function that accepts the book's mongo _id value as param and deletes the book from the database


export default class EventsModal extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  handleAddToEvent(tierName) {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {

      return false;

    }

    console.log(tierName);

    alert(this.props.event + ' <> ' + tierName);

    try {

      const { data } = this.props.apolloClient.mutate({
        mutation: ADD_TIER_TO_EVENT,
        variables: {
          name: this.props.event,
          tierName: tierName
        },
      });

      console.log(data);

      return data;

    } catch (err) {

      console.error(err);

    }

  }

  render() {

    console.log(this.state?.events?.data?.events, this.state?.events?.data, this.state?.tiers, this.state, this.props)


    return (

      <Modal
        {...this.props}
        size="lg"
        background-color="silver"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div style={{ backgroundColor: "green" }}>
          <Modal.Body>
            <h4>Add which Tier to this Event?</h4>
            <p>
              {this.props?.tiers?.data?.tiers?.map((tier) => {
                return (
                  <button
                    onClick={() => this.handleAddToEvent(tier.tierName, this.props.event)}>
                    <h5>{tier.tierName}</h5>
                  </button>
                );
              })}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

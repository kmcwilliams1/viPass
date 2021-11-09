import {Modal, Button, Card} from "react-bootstrap";
import React, {Component} from "react";
import Auth from "../../utils/auth";
// create function that accepts the book's mongo _id value as param and deletes the book from the database


export default class EventsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    function handleAddToTier(accessArea, tierName) {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) {
        return false;
      }

      try {
        const {data} = this.addPermissionToTier({
          variables: {accessArea: accessArea, tierName: tierName},
        });
        console.log(data);
        return data;
      } catch (err) {
        console.error(err);
      }
    };

    console.log(this.state?.tiers?.data?.tiers, this.state?.tiers?.data, this.state?.tiers, this.state)
    return (

      <Modal

        {...this.props}
        size="lg"
        background-color="silver"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div style={{backgroundColor: "green"}}>
          <Modal.Body>
            <h4>Add this Permission to which Tier?</h4>
            <p>
              {this.props?.tiers?.data?.tiers?.map((tier) => {
                return (
                  <button onClick={() => {
                    handleAddToTier()
                  }}><h5>{tier.tierName}</h5></button>
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

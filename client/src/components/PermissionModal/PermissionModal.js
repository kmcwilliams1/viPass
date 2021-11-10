import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import Auth from "../../utils/auth";
import {ADD_PERMISSION_TO_TIER} from "../../utils/mutations";
// create function that accepts the book's mongo _id value as param and deletes the book from the database


export default class PermissionModal extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.handleAddToTier = this.handleAddToTier.bind(this)
  }

  handleAddToTier(tierName) {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }


    console.log(tierName)

    alert(this.props.permission + ' <> ' + tierName);

    //try {

    const { data } = this.props.apolloClient.mutate({
      mutation: ADD_PERMISSION_TO_TIER,
      variables: {
        accessArea: this.props.permission,
        tierName: tierName
      },
    });

    console.log(data);

    return data;
    /*} catch (err) {
      console.error(err);
    }*/
  }

  render() {

    console.log(this.props?.tiers?.data?.tiers, this.props?.tiers?.data, this.props?.tiers, this.props)

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
            <h4>Add this Permission to which Tier?</h4>
            <p>
              {this.props?.tiers?.data?.tiers?.map((tier) => {
                return (
                  <button
                    onClick={() => this.handleAddToTier(tier.tierName)}>
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

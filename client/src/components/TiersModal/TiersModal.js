import {Modal, Button} from "react-bootstrap";
import React, {Component} from "react";
import Auth from "../../utils/auth";
import {ADD_PERMISSION_TO_TIER, ADD_TIER_TO_USER} from "../../utils/mutations";

export default class TiersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleAddTierToUser() {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    alert(this.props.tier + ' <> ' +  this.state.userEmail);

    const { data } = this.props.apolloClient.mutate({
      mutation: ADD_TIER_TO_USER,
      variables: {
        tierName: this.props.tier,
        email: this.state.userEmail
      },
    });

    console.log(data);

    return data;
    /*} catch (err) {
      console.error(err);
    }*/
  }


  render() {

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
            <h4>Add which Email to {this.props.tier}?</h4>
            <p>

                  <div>
                    <input onKeyUp={(event) => this.setState({userEmail: event.target?.value})} placeholder={"enter user's email"}></input>
                    <button onClick={(event) => {
                      console.log(this.props.tier, this.state.userEmail)
                      this.handleAddTierToUser(this.props.tiers)
                    }}>Add to Email</button>
                  </div>


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

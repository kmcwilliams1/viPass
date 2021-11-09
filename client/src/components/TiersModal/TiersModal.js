import {Modal, Button} from "react-bootstrap";
import React, {Component} from "react";
import Auth from "../../utils/auth";

export default class TiersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    // function handleAddUserToTier(email, tierName) {
    //   const token = Auth.loggedIn() ? Auth.getToken() : null;
    //   if (!token) {
    //     return false;
    //   }
    //
    //   try {
    //     const {data} = this.addUserToTier({
    //       variables: {email: email, tierName: tierName},
    //     });
    //     console.log(data);
    //     return data;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

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
            <h4>Add which User to this Tier?</h4>
            <p>
              {this.props?.users?.data?.users?.map((user) => {
                return (
                  <div>
                    <textarea placeholder={"enter user's email"}></textarea>
                    <button onClick={() => {
                      handleAddUserToTier({user.email})
                    }}></button>
                  </div>
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

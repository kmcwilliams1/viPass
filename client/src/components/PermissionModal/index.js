import { Modal, Button } from "react-bootstrap";
import {Component} from "react";




export default class PermissionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
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

            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Add this Permission to which Tier?</h4>
              <p>
                {this.state?.tiers?.data?.tiers?.map(tierName => {
                })|| <h1>no content</h1>}
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

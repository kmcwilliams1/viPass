import { Modal, Button } from "react-bootstrap";

function PermissionModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      background-color="silver"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div style={{backgroundColor:"darkgrey"}}>
      
      <Modal.Body>
        <h4>Add Which Tier to This Event?</h4>
        <p>
          !!!! RENDER LIST OF TIERS HERE  !!!!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button style={{backgroundColor: "green"}} onClick={props.onHide}>Save</Button>
      </Modal.Footer>
      </div>
    </Modal>
  );
}

export default PermissionModal;
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
      <div style={{backgroundColor:"green"}}>
      
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Add this Permission to which Tier?</h4>
        <p>
          !!!! RENDER LIST OF TIERS HERE  !!!!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      </div>
    </Modal>
  );
}

export default PermissionModal;
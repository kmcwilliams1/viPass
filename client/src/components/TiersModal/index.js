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
        <h4>Add This Tier to Which User's Email?</h4>
        <textarea>
          !!!! Type in Email !!!!
        </textarea>
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
import React, {Component} from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import {useQuery, useMutation} from "@apollo/client";
import Auth from "../../utils/auth";
import {REMOVE_PERMISSION, ADD_PERMISSION} from "../../utils/mutations";
import {QUERY_EVENT} from "../../utils/queries";
import PermissionModal from '../PermissionModal/PermissionModal'


const HandleRemovePermission = () => {
  const [removePermission] = useMutation(REMOVE_PERMISSION);
  return async (permissionId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const {data} = await removePermission({
        variables: {permissionId: permissionId},
      });
      console.log(permissionId);
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
}

export default class PermissionsList extends Component {
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
    const permissionsLength = this.props.permissions?.data?.permissions?.length

    // create function that accepts the book's mongo _id value as param and deletes the book from the database

    // const handleAddToTier = async (accessArea, tierId) => {
    //   const token = Auth.loggedIn() ? Auth.getToken() : null;
    //   if (!token) {
    //     return false;
    //   }
    //   try {
    //     const { data } = await addPermissionToTier({
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
            <h1>Viewing permissions!</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {permissionsLength
              ? `Viewing saved permissions`
              : "You have no permissions!"}
          </h2>
          <CardColumns>
            {this.props.permissions?.data?.permissions?.map((permission) => {

              return (
                <Card key={permission.accessArea} border="dark">
                  <Card.Body>
                    <Card.Title>{permission.accessTier}</Card.Title>
                    <p className="small">
                      Permission Creator: {permission.accessCreator}
                    </p>
                    <Card.Text>{permission.accessArea}</Card.Text>
                    <Button
                      className="btn-block btn-dark"
                      onClick={this.hideShowModal}
                    >
                      Add to tier!
                    </Button>
                    {this.state.modalShow
                    && <PermissionModal
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
                        HandleRemovePermission(permission._id);
                        window.location.reload();
                      }}
                    >
                      Delete this permission!
                    </Button>

                    {/* <Button
                    className="btn-block btn-success"
                    onClick={() => handleEditPermission(permission.name)}
                  >
                    Edit this permission!
                  </Button> */}
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


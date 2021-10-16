import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { REMOVE_PERMISSION } from "../../utils/mutations";
import { QUERY_PERMISSIONS } from "../../utils/queries";

const PermissionsList = ({permissions}) => {
  const [removePermission] = useMutation(REMOVE_PERMISSION);
  const { loading } = useQuery(QUERY_PERMISSIONS);
  
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleremovePermission = async (accessEvent) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removePermission({
        variables: { accessEvent },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing permissions!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {permissions?.length
            ? `Viewing ${permissions.length} saved ${
                permissions.length === 1 ? "permission" : "permissions"
              }:`
            : "You have no permissions!"}
        </h2>
        <CardColumns>
          {permissions?.map((permission) => {
            return (
              <Card key={permission.accessEvent} border="dark">
                <Card.Body>
                  <Card.Title>{permission.accessTier}</Card.Title>
                  <p className="small">Permission Creator: {permission.accessCreator}</p>
                  <Card.Text>{permission.accessArea}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleremovePermission(permission.accessEvent)}
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
};
export default PermissionsList;


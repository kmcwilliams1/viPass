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
import { REMOVE_ADMIN } from "../../utils/mutations";
import { QUERY_ADMIN } from "../../utils/queries";

const AdminList = ({ admins }) => {
  const [removeAdmin] = useMutation(REMOVE_ADMIN);
  const { loading } = useQuery(QUERY_ADMIN);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteAdmin = async (userId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removeAdmin({
        variables: { userId: userId },
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
          <h1>Viewing admins</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {admins?.length
            ? `Viewing ${admins.length} saved ${
                admins.length === 1 ? "admin" : "admins"
              }:`
            : "You have no admins!"}
        </h2>
        <CardColumns>
          {admins.map((admin) => {
            return (
              <Card key={admin.username} border="dark">
                <Card.Body>
                  <Card.Text>{admin.username}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteAdmin(admin._id)}
                  >
                    Delete this user!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default AdminList;

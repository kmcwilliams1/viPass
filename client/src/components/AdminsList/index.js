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

const AdminList = ({admins}) => {
  const [removeAdmin] = useMutation(REMOVE_ADMIN);
  const { loading } = useQuery(QUERY_ADMIN);

<<<<<<< HEAD
=======

>>>>>>> 5a07905b6db43fbfb05b28ab3e000e67e26e217c
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteAdmin = async (username) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removeAdmin({
        variables: { username },
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
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteAdmin(admin.username)}
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
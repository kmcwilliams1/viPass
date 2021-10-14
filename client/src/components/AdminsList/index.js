import React , {useState}  from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { REMOVE_ADMIN } from "../utils/mutations";
import { QUERY_ADMINS } from "../utils/queries";
const AdminList = () => {
  const [removeAdmin] = useMutation(REMOVE_ADMIN);
  const { loading, data } = useQuery(QUERY_ADMINS);
  const userData = data?.me || {};
  
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
          {userData.username?.length
            ? `Viewing ${userData.username.length} saved ${
                userData.username.length === 1 ? "user" : "users"
              }:`
            : "You have no amdins!"}
        </h2>
        <CardColumns>
          {userData.username?.map((users) => {
            return (
              <Card key={users.username} border="dark">
                <Card.Body>
                  <Card.Title>{users.email}</Card.Title>
                  <Card.Text>{users.permissions}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteAdmin(users.username)}
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

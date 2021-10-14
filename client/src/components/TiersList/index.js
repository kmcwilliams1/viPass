
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
import { REMOVE_TIER } from "../utils/mutations";
import { QUERY_TIERS } from "../utils/queries";
const TierList = () => {
  const [removeTier] = useMutation(REMOVE_TIER);
  const { loading, data } = useQuery(QUERY_TIERS);
  const userData = data?.me || {};
  
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteTier = async (name) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removeTier({
        variables: { name },
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
          <h1>Viewing tiers</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.name?.length
            ? `Viewing ${userData.name.length} saved ${
                userData.name.length === 1 ? "tier" : "tiers"
              }:`
            : "You have no amdins!"}
        </h2>
        <CardColumns>
          {userData.name?.map((tiers) => {
            return (
              <Card key={tiers.name} border="dark">
                <Card.Body>
                  <Card.Title>{tiers.users}</Card.Title>
                  <Card.Text>{tiers.permissions}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteTier(tiers.name)}
                  >
                    Delete this tier!
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
export default TierList;

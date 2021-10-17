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
import { REMOVE_TIER } from "../../utils/mutations";
import { QUERY_TIER } from "../../utils/queries";
const TierList = ({ tiers }) => {
  const [removeTier] = useMutation(REMOVE_TIER);
  const { loading } = useQuery(QUERY_TIER);

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
          {tiers?.length
            ? `Viewing ${tiers.length} saved ${
                tiers.length === 1 ? "tier" : "tiers"
              }:`
            : "You have no tiers!"}
        </h2>
        <CardColumns>
          {tiers.map((tier) => {
            return (
              <Card key={tier.name} border="dark">
                <Card.Body>
                  <Card.Title>{tier.users}</Card.Title>
                  <Card.Text>{tier.permissions}</Card.Text>

                  <Card.Text>
                    {tier.permissions.map((permission) => (
                      <>
                        <p key={permission.event}></p>
                        <p key={permission.area}></p>
                        <p key={permission.creator}></p>
                      </>
                    ))}
                  </Card.Text>
                  {/* 
                  <Card.Text>
                    {tier.users.map((user) => (
                      <>
                        <p key={user.event}></p>
                        <p key={user.area}></p>
                        <p key={user.creator}></p>
                        <p kry={user.tier}></p>
                      </>
                    ))}
                  </Card.Text> */}

                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteTier(tier.name)}
                  >
                    Delete this tier!
                  </Button>

                  {/* <Button
                    className="btn-block btn-success"
                    onClick={() => handleEditTier(tier.name)}
                  >
                    Edit this tier!
                  </Button> */}

                  {/* <Button
                    className="btn-block btn-success"
                    onClick={() => handleAddTierPermissions(tier.name)}
                  >
                    Add Permissions to this Tier!
                  </Button> */}

                  {/* <Button
                    className="btn-block btn-success"
                    onClick={() => handleAddTierUsers(tier.name)}
                  >
                    Add Users to this Tier!
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
export default TierList;

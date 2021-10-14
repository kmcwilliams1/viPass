import React,{useState} from 'react';
import { useQuery} from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const ClientHome =({
}) => {
  const client = useState();
  const { data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (!client) {
    return <h3>Must be logged in</h3>;
  }

  return (
    {userData.map((users) => {
        return (
          <Card key={users.usernane} border="dark">
            <Card.Body>
              <Card.Title>{users.accessTier}</Card.Title>
              <Card.Text>{users.accessArea}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
     
  );
}

export default ClientHome;
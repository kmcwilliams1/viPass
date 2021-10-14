import React,{useState} from 'react';
import { useQuery} from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const ClientHome =({
}) => {
  const client = useState();
  const { data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (!client) {
    return <h3>Must be logged in</h3>;
  }

  return (
      <div>
    {userData.map((users) => {
        return (
          <p key={users.usernane} border="dark">

              <p>{users.accessTier}</p>
              <p>{users.accessArea}</p>

          </p>
        );
      })}
     </div>
  );
}

export default ClientHome;
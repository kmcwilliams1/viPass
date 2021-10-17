import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const ClientHome = () => {
  const client = useState();
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];
  if (!client) {
    return <h3>Must be logged in</h3>;
  }
  console.log(userData.events);
  return (
    <div>
      {/* {userData.events.map((event) => {
        return (
          <p key={event.name} border="dark">
            <p>{event.name}</p>
          </p>
        );
      })} */}
    </div>
  );
};

export default ClientHome;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";

import Auth from "../../utils/auth";

const EventsForm = () => {
  const [newEventText, setNewEventText] = useState("");

  const [addEventtoUser, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEventtoUser } }) {
      try {
        const { event } = cache.readQuery({ query: QUERY_EVENT });
        cache.writeQuery({
          query: QUERY_EVENT,
          data: { event: [addEventtoUser, ...event] },
          //is it ...users??
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addEventtoUser({
        variables: {
          newEventText,
        },
      });

      console.log(data);
      setNewEventText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name } = event.target;
    if (name === "newEventText") {
      setNewEventText(name);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="newEventText"
                placeholder="What is the new event?"
                value={newEventText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Event
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be an admin to create new events. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default EventsForm;

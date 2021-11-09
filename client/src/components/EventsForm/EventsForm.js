import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";

import Auth from "../../utils/auth";

const EventsForm = () => {
  const [newEventText, setNewEventText] = useState("");

  const [addEvent, { error }] = useMutation(ADD_EVENT, {

    update(cache, { data: { addEvent } }) {
      try {
        const { event } = cache.readQuery({ query: QUERY_EVENT });
        cache.writeQuery({
          query: QUERY_EVENT,
          data: { event: [addEvent, ...event] },
        });
      } catch (e) {
        console.error(e);
      }
    },

  });

  const handleFormSubmit = async () => {
    try {
      const { data } = await addEvent({
        variables: {
          name: newEventText,
        },
      });

      console.log(data);
      setNewEventText("");
    } catch (err) {
      console.error(err);
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
              <input
                className="form-input w-100" type="text"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                placeholder="What is the new event?"
                value={newEventText} onChange={(e) =>
                  setNewEventText(e.target.value)} />
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

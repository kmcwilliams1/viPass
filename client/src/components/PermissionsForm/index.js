import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_PERMISSION } from "../../utils/mutations";
import { QUERY_PERMISSIONS } from "../../utils/queries";

import Auth from "../../utils/auth";

const PermissionsForm = () => {
  const [newPermissionText, setNewPermissionText] = useState("");

  const [addPermissiontoTier, { error }] = useMutation(ADD_PERMISSION, {
    update(cache, { data: { addPermissiontoTier } }) {
      try {
        const { permissions } = cache.readQuery({ query: QUERY_PERMISSIONS });
        //is it QUERY_ADMIN?
        cache.writeQuery({
          query: QUERY_PERMISSIONS,
          data: { permissions: [addPermissiontoTier, ...permissions] },
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
      const { data } = await addPermissiontoTier({
        variables: {
          newPermissionText,
        },
      });

      console.log(data);
      setNewPermissionText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "newPermissionText") {
      setNewPermissionText(value);
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
                name="newPermissionText"
                placeholder="What is the new permission?"
                value={newPermissionText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Permission
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
          You need to be an admin to create new permisions. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PermissionsForm;

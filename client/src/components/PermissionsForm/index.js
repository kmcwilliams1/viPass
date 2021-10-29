import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_PERMISSION } from "../../utils/mutations";
import { QUERY_PERMISSIONS } from "../../utils/queries";

import Auth from "../../utils/auth";

const PermissionsForm = () => {
  const [newPermissionText, setNewPermissionText] = useState("");

  const [addPermission, { error }] = useMutation(ADD_PERMISSION, {
    update(cache, { data: { addPermission } }) {
      try {
        const { permissions } = cache.readQuery({ query: QUERY_PERMISSIONS });
        //is it QUERY_ADMIN?
        cache.writeQuery({
          query: QUERY_PERMISSIONS,
          data: { permissions: [addPermission, ...permissions] },
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
      const { data } = await addPermission({
        variables: {
          accessArea: newPermissionText,
        },
      });
      console.log(data);
      setNewPermissionText("");
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
                placeholder="What is the new permission?"
                value={newPermissionText} onChange={(event) =>
                  setNewPermissionText(event.target.value)} />
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

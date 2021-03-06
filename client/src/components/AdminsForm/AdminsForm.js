import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { MAKE_ADMIN } from '../../utils/mutations';
import { QUERY_ADMIN } from '../../utils/queries';

import Auth from '../../utils/auth';

const AdminsForm = () => {
  const [newAdminText, setNewAdminText] = useState('');


  const [addAdmin, { error }] = useMutation(MAKE_ADMIN, {
    update(cache, { data: { addAdmin } }) {
      try {
        const { users } = cache.readQuery({ query: QUERY_ADMIN });
        cache.writeQuery({
          query: QUERY_ADMIN,
          data: { users: [addAdmin, ...users] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addAdmin({
        variables: {
          username: newAdminText,
        },
      });
      const { username, value } = event.target;

      if (username === 'newAdminText') {
        setNewAdminText(value);
      }
      console.log(data)
      setNewAdminText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'newAdminText') {
      setNewAdminText(value);
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
                placeholder="Who is the new admin?"
                value={newAdminText} onChange={(event) =>
                  setNewAdminText(event.target.value)} />
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Admin
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
          You need to be an admin to create new admins. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default AdminsForm;

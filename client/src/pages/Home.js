import React from 'react';
import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import Permissions from './Permissions';

import AdminList from '../components/AdminList';


import { QUERY_PERMISSIONS } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_PERMISSIONS);
  const permissions = data?.permissions || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <Link className="button is-focused" to="/login">
            Login
          </Link>
          <Link className="button is-link is-focused" to="/signup">
            Signup
          </Link>
          <Permissions  permissions={permissions} />
          <AdminList
            // admins={admins}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;

import React from 'react';
import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';


import PermissionsList from '../components/PermissionsList';
import PermissionsForm from '../components/PermissionsForm';
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
              

              
        </div>
<<<<<<< HEAD
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              permissions={permissions}
              title="Some Feed for Permission(s)..."
=======
            <AdminList
              admins={admins}
              title="Some Feed for Thought(s)..."
>>>>>>> 3340a67c3cf11d54b4cbb27f94ef9841ac42f2a8
            />
    

      </div>
    </main>
  );
};

export default Home;

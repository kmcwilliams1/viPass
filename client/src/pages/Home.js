import React from 'react';
// import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

// import Permissions from './Permissions';

// import { QUERY_PERMISSIONS } from '../utils/queries';
// import Admins from './Admins';


const Home = () => {
  // const { data } = useQuery(QUERY_PERMISSIONS);
  // const permissions = data?.permissions || [];
  // const admins = data?.admins || [];
  // const tier = data?.tier || [];

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
          
          {/* <ClientHome/>
          <Permissions  permissions={permissions} />
          <AdminList admins={admins} />
            
           <Permissions  permissions={permissions} /> 
          <Admins
            users={user}
          /> */}
        </div>
      </div>
    </main>
  );
};

export default Home;

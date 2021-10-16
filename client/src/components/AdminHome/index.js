import React from 'react';
import Permissions from '../../pages/Permissions';
import Tiers from '../../pages/Tiers';
import Admins from '../../pages/Admins';
import { Link, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ApolloProvider } from '@apollo/client';


const AdminHome = () => {
  return (
    <ApolloProvider>
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <Link to="/AdminHome/Permissions">
            <Button color="white" className="is-rounded">
              <span>Edit Permissions</span>
            </Button>
          </Link>
          <Link to="/AdminHome/Admins">
            <Button color="white" className="is-rounded">
              <span>Edit Admins</span>
            </Button>
          </Link>
          <Link to="/AdminHome/Tiers">
            <Button color="white" className="is-rounded">
              <span>Edit Tiers</span>
            </Button>
          </Link>
          <Route path="/AdminHome/Admins">
            <Admins />
          </Route>
          <Route path="/AdminHome/Permissions">
            <Permissions />
          </Route>
          <Route path="/AdminHome/Tiers">
            <Tiers />
          </Route>
        </div>
      </div>
    </main>
    </ ApolloProvider>
  );
};


export default AdminHome;



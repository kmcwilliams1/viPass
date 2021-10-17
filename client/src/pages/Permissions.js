import React from 'react';

// Import the `useParams()` hook

import { useQuery } from '@apollo/client';

import PermissionsList from '../components/PermissionsList';
import PermissionsForm from '../components/PermissionsForm';

import { QUERY_PERMISSIONS } from '../utils/queries';


const Permissions = () => {
  const { loading, data } = useQuery(QUERY_PERMISSIONS);
  const permissions = data?.permissions || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (        <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >     <PermissionsList
              permissions={permissions}
              title="Some Permissions..."
            />
            <PermissionsForm />
          </div>
        
          )}
        </div>
      </div>
    </main>
  );
};


export default Permissions;

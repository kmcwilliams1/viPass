import React from 'react';

// Import the `useParams()` hook

import { useQuery } from '@apollo/client';

import AdminsList from '../components/AdminsList';
import AdminsForm from '../components/AdminsForm';

import { QUERY_ADMINS } from '../utils/queries';


const Admins = () => {
  const { loading, data } = useQuery(QUERY_ADMINS);
  const admins = data?.admins || [];
  console.log(data)
console.log(admins)
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (        <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >     <AdminsList
              user={user.isAmin = true }
              title="List of current Admins..."
            />
            <AdminsForm />
          </div>
        
          )}
        </div>
      </div>
    </main>
  );
};


export default Admins;

import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PermissionsList from '../components/PermissionsList';
import PermissionsForm from '../components/PermissionsForm';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';


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
          >     <PermissionList
              permissions={permissions}
              title="Some Feed for Permission(s)..."
            />
            <PermissionForm />
          </div>
        
          )}
        </div>
      </div>
    </main>
  );
};





// const Permissions = () => {
//   // Use `useParams()` to retrieve value of the route parameter `:profileId`
//   const { thoughtId } = useParams();

//   const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
//     // pass URL parameter
//     variables: { thoughtId: thoughtId },
//   });

//   const permission = data?.permission || {};

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="my-3">
//       <h3 className="card-header bg-dark text-light p-2 m-0">
//         {permission.thoughtAuthor} <br />
//         <span style={{ fontSize: '1rem' }}>
//           had this permission on {permission.createdAt}
//         </span>
//       </h3>
//       <div className="bg-light py-4">
//         <blockquote
//           className="p-4"
//           style={{
//             fontSize: '1.5rem',
//             fontStyle: 'italic',
//             border: '2px dotted #1a1a1a',
//             lineHeight: '1.5',
//           }}
//         >
//           {permission.thoughtText}
//         </blockquote>
//       </div>
//     </div>
//   );
// };

export default Permissions;

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
              title="Some Feed for Permissions(s)..."
            />
            <PermissionsForm />
          </div>
        
          )}
        </div>
      </div>
    </main>
  );
};





// const Permissions = () => {
//   // Use `useParams()` to retrieve value of the route parameter `:profileId`
//   const { permissionId } = useParams();

//   const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
//     // pass URL parameter
//     variables: { permissionId: permissionId },
//   });

//   const permissions = data?.permissions || {};

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="my-3">
//       <h3 className="card-header bg-dark text-light p-2 m-0">
//         {permissions.thoughtAuthor} <br />
//         <span style={{ fontSize: '1rem' }}>
//           had this permissions on {permissions.createdAt}
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
//           {permissions.thoughtText}
//         </blockquote>
//       </div>
//     </div>
//   );
// };

export default Permissions;

import React, {useState} from 'react';


function PermissionsList() {
  const [permissions] = useState(['pool', 'mini bar', 'roof' , 'continental breakfast']);
  return (
    <section >
      <div id="container" className="container">
        {permissions.map((permission) => (
          <div className="box">
            {permission}
          </div>
        ))}
      </div>
    </section>
  );
}


// const PermissionsList = ({
//   isAdmin = true,
// }) => {
//   if (!isAdmin) {
//     return 
//     //how to redirect??;
//   }
//     const [permissions] = useState(['pool', 'mini bar', 'roof', 'continental breakfast']);
//     return (
//       <section >
//         <div id="container" className="container">
//           {permissions.map((permission) => (
//             <div className="box">
//               {permission}
//             </div>
//           ))}
//         </div>
//       </section>
//     );
// };

export default PermissionsList;

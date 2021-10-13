import React from 'react';
import { Link } from 'react-router-dom';

const AdminList =({
  // isAdmin = true,

}) => {
  if (!admins.length) {
    return <h3>No Admins Yet</h3>;
  }

  const [admins] = useState(['email@email.com', 'email2@email.com']);
  return (
    <section >
        <button onClick = "makeAdmin()" >Add Admin</button> 
      <div id="container" className="container">
        {admins.map((admin) => (
          <div className="box">
            {admin}
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminList



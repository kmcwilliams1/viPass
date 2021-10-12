import React from "react";
import ".../index.css"



function Admin() {
  const [admins] = useState(['email@email.com', 'email2@email.com']);
  return (
    <section >
        <button onClick = "addAdmin()" >Add Admin</button> 
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

export default Admin
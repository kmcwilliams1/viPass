import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
          <Link className="button is-focused" to="/signup">
            Signup
          </Link>
          {/* <Route exact path="/AdminHome" /> */}
        </div>
      </div>
    </main>
  );
};

export default Home;

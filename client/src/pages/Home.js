import React from 'react';
import { useQuery } from '@apollo/client';


import ThoughtList from '../components/PermissionsList';

import ThoughtForm from '../components/ThoughtForm';
import AdminList from '../components/AdminList';

import { QUERY_THOUGHTS } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        
            <AdminList
              admins={admins}
              title="Some Feed for Thought(s)..."
            />
    
      </div>
    </main>
  );
};

export default Home;

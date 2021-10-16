import React from 'react';

// Import the `useParams()` hook

import { useQuery } from '@apollo/client';

import TiersList from '../components/TiersList';
import TiersForm from '../components/TiersForm';

import { QUERY_TIER } from '../utils/queries';


const Tiers = () => {
  const { loading, data } = useQuery(QUERY_TIER);
  const tiers = data?.tiers || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (        <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >     <TiersList
              tiers={tiers}
              title="Some Tiers..."
            />
            <TiersForm />
          </div>
        
          )}
        </div>
      </div>
    </main>
  );
};


export default Tiers;

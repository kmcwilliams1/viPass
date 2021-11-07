import React from 'react';

// Import the `useParams()` hook

import { useQuery } from '@apollo/client';

import EventsList from '../components/EventsList';
import EventsForm from '../components/EventsForm';

import { QUERY_EVENT } from '../utils/queries';


const Events = () => {
  const { loading, data } = useQuery(QUERY_EVENT);
  const events = data?.events || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (        <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >     <EventsList
              events={events}
              title="Some Events..."
            />
            <EventsForm events={events} />
          </div>
        
          )}
        </div>
      </div>
    </main>
  );
};


export default Events;

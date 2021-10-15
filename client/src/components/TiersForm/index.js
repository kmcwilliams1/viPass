import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_TIER } from '../../utils/mutations';
import { QUERY_TIERS} from '../../utils/queries';
import Auth from '../../utils/auth';

const TiersForm = () => {
  const [newTierText, setNewTierText] = useState('');
  const [addTier, { error }] = useMutation(ADD_TIER, {
    update(cache, { data: { addTier } }) {
      try {
        const { tiers } = cache.readQuery({ query: QUERY_TIERS });
            //is it QUERY_TIERS?  
        cache.writeQuery({
          query: QUERY_TIERS,
          data: { tiers: [addTier, ...tiers] },
          //is it ...users??
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTier({
        variables: {
          newTierText,
        },
      });
      
      console.log(data)
      setNewTierText('');
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'newTierText') {
      setNewTierText(value);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="newTierText"
                placeholder="What is the new tier?"
                value={newTierText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Tier
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be an admin to create new tiers. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TiersForm;

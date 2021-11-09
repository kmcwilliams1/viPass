import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import {ADD_TIER} from '../../utils/mutations';
import {QUERY_TIER} from '../../utils/queries';
import Auth from '../../utils/auth';

const TiersForm = () => {
  const [newTierText, setNewTierText] = useState('');

  const [addTier, { error }] = useMutation(ADD_TIER, {

    update(cache, { data: { addTier } }) {

      try {

        const { tiers } = cache.readQuery({ query: QUERY_TIER });

        cache.writeQuery({
          query: QUERY_TIER,
          data: {
            tiers: [addTier, ...tiers]
          },
        });

      } catch (e) {
        console.error(e);
      }

    },

  });

  const handleFormSubmit = async (event) => {

    event.preventDefault();

    try {
      alert(newTierText)

      const { data } = await addTier({
        variables: {
          tierName: newTierText,
        },
      });


      console.log('whoooooooohoooo', data)
      setNewTierText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'tierName') {
      setNewTierText(value);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="tierName"
                placeholder="What is the new tier?"
                value={newTierText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
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
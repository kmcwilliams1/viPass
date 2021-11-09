import React, {Component} from 'react';

// Import the `useParams()` hook

import { useQuery } from '@apollo/client';

import TiersList from '../components/TiersList/TiersList';
import TiersForm from '../components/TiersForm/TiersForm';

import { QUERY_TIER } from '../utils/queries';


export default class Tiers extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <main>
        <div className="flex-row justify-center">
          <div className="col-12 col-md-8 mb-3">
           <div
                className="col-12 col-md-10 mb-3 p-3"
                style={{border: '1px dotted #1a1a1a'}}
              ><TiersList
                apolloClient={this.props.apolloClient}
                QueryUserData={this.props.QueryUserData}
                currentUser={this.props.currentUser}
                permissions={this.props.permissions}
                tiers={this.props.tiers}
                events={this.props.events}
                admins={this.props.admins}
                title="Some Tiers..."
              />
                <TiersForm />
              </div>
          </div>
        </div>
      </main>
    );
  }
};


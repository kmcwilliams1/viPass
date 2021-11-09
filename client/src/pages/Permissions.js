import React, {Component} from 'react';

// Import the `useParams()` hook

import {useQuery} from '@apollo/client';

import PermissionsList from '../components/PermissionsList/PermissionsList';
import PermissionsForm from '../components/PermissionsForm/PermissionsForm';

import {QUERY_PERMISSIONS} from '../utils/queries';


export default class Permissions extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <div className="flex-row justify-center">
          <div className="col-12 col-md-8 mb-3">
            <div
              className="col-12 col-md-10 mb-3 p-3"
              style={{border: '1px dotted #1a1a1a'}}
            ><PermissionsList apolloClient={this.props.apolloClient}
                              currentUser={this.props.currentUser}
                              permissions={this.props.permissions}
                              tiers={this.props.tiers}
                              events={this.props.events}
                              admins={this.props.admins}
                              title="Some Permissions..."
            />
              <PermissionsForm/>
            </div>
          </div>
        </div>
      </main>
    );
  }
}


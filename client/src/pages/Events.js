import React, {Component} from 'react';

// Import the `useParams()` hook
import EventsList from '../components/EventsList/EventsList';
import EventsForm from '../components/EventsForm/EventsForm';


export default class Events extends Component {

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
              style={{ border: '1px dotted #1a1a1a' }}
            ><EventsList
              apolloClient={this.props.apolloClient}
              QueryUserData={this.props.QueryUserData}
              currentUser={this.props.currentUser}
              permissions={this.props.permissions}
              tiers={this.props.tiers}
              users={this.props.users}
              events={this.props.events}
              admins={this.props.admins}
              title="Some Events..."
            />
              <EventsForm
                events={this.props.events}/>
            </div>

          </div>
        </div>
      </main>
    );
  }
}

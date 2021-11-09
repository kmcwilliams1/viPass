import { React, Component } from 'react';
import Permissions from '../../pages/Permissions';
import Tiers from '../../pages/Tiers';
import Admins from '../../pages/Admins';
import Events from '../../pages/Events';
import { Link, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ApolloClient, ApolloProvider, useQuery } from '@apollo/client';

class AdminHome extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ApolloProvider>
        <main>
          <div className="flex-row justify-center">
            <div
              className="col-12 col-md-10 mb-3 p-3"
              style={{ border: '1px dotted #1a1a1a' }}

            >
              <Link to="/AdminHome/Permissions">
                <Button color="white" className="is-rounded">
                  <span>Edit Permissions</span>
                </Button>
              </Link>
              <Link to="/AdminHome/Admins">
                <Button color="white" className="is-rounded">
                  <span>Edit Admins</span>
                </Button>
              </Link>
              <Link to="/AdminHome/Tiers">
                <Button color="white" className="is-rounded">
                  <span>Edit Tiers</span>
                </Button>
              </Link>
              <Link to="/AdminHome/Events">
                <Button color="white" className="is-rounded">
                  <span>Edit Events</span>
                </Button>
              </Link>
              <Route path="/AdminHome/Admins">
                <Admins />
              </Route>
              <Route path="/AdminHome/Permissions">
                <Permissions apolloClient={this.props.apolloClient}
                             currentUser = {this.props.currentUser}
                             QueryUserData={this.props.QueryUserData}
                             permissions= {this.props.permissions}
                             tiers= {this.props.tiers}
                             events= {this.props.events}
                             admins= {this.props.admins}/>
              </Route>
              <Route path="/AdminHome/Tiers">
                <Tiers apolloClient={this.props.apolloClient}
                       QueryUserData={this.props.QueryUserData}
                       currentUser = {this.props.currentUser}
                       permissions= {this.props.permissions}
                       tiers= {this.props.tiers}
                       events= {this.props.events}
                       admins= {this.props.admins} />
              </Route>
              <Route path="/AdminHome/Events">
                <Events apolloClient={this.props.apolloClient}
                        currentUser = {this.props.currentUser}
                        QueryUserData={this.props.QueryUserData}
                        permissions= {this.props.permissions}
                        tiers= {this.props.tiers}
                        events= {this.props.events}
                        admins= {this.props.admins} />
              </Route>
            </div>
          </div>
        </main>
      </ ApolloProvider>
    );
  }
};


export default AdminHome;




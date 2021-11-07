import { React, Component } from 'react';
import Permissions from '../../pages/Permissions';
import Tiers from '../../pages/Tiers';
import Admins from '../../pages/Admins';
import Events from '../../pages/Events';
import { Link, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ApolloClient, ApolloProvider, useQuery } from '@apollo/client';

import { QUERY_EVENT, QUERY_USER, QUERY_PERMISSIONS, QUERY_ADMIN, QUERY_TIER, } from '../../utils/queries'


class AdminHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      permissions: null,
      tiers: null,
      events: null,
      admins: null
    }
  }
  QueryUserData = async (username) => {
    if(undefined === username){username = "sexy"}
    return await this.props.apolloClient.query({
      query: QUERY_USER,
      variables: {
        username
      }
    }) 
  }
  
  QueryPermissionData = async (accessArea) => {
    if(undefined === accessArea){accessArea = "somewhere over the rainbow"}
    return await this.props.apolloClient.query({
      query: QUERY_PERMISSIONS,
      variables: {
        accessArea
      }
    }) 
  }
  
  QueryAdminData = async(username) => {
    if(undefined === username){username = "sexy"}
    return await this.props.apolloClient.query({
      query: QUERY_ADMIN,
      variables: {
        username
      }
    }) 
  }
  
  QueryTierData = async(name) => {
    if(undefined === name){name = "super ultra mega delux"}
    return await this.props.apolloClient.query({
      query: QUERY_TIER,
      variables: {
        name
      }
    }) 
  }
  
  QueryEventData = async (name) => {
    if(undefined === name){name = "party city 3.0"}
    return await this.props.apolloClient.query({
      query: QUERY_EVENT,
      variables: {
        name
      }
    }) 
  }
  
  componentDidMount() {
    this.setState(
      {
        currentUser: this.QueryUserData(),
        permissions: this.QueryPermissionData(),
        tiers: this.QueryTierData(),
        events: this.QueryEventData(),
        // admins: this.QueryAdminData()
      });
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
                <Permissions />
              </Route>
              <Route path="/AdminHome/Tiers">
                <Tiers />
              </Route>
              <Route path="/AdminHome/Events">
                <Events />
              </Route>
            </div>
          </div>
        </main>
      </ ApolloProvider>
    );
  }
};


export default AdminHome;




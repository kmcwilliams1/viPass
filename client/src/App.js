import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminHome from "./components/AdminHome/AdminHome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ClientHome from "./components/ClientHome/ClientHome";

import {
  QUERY_EVENT,
  QUERY_USERS,
  QUERY_PERMISSIONS,
  QUERY_ADMIN,
  QUERY_TIER,
} from './utils/queries'


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apolloClient: client,
      users: null,
      permissions: null,
      tiers: null,
      events: null,
      admins: null
    }
    this.QueryUserData = this.QueryUserData.bind(this)
  }

  QueryUserData = async () => {
    const queryUsers = await this.state.apolloClient.query({
      query: QUERY_USERS,
    });
    this.setState({ users: queryUsers })
  }

  QueryPermissionData = async () => {
    const queryPermissions = await this.state.apolloClient.query({
      query: QUERY_PERMISSIONS,
    });
    this.setState({permissions: queryPermissions})
  }


  QueryAdminData = () => {
    const queryAdmins = this.state.apolloClient.query({
      query: QUERY_ADMIN,
    });
    this.setState({admins: queryAdmins})
  }

  QueryTierData = async () => {
    const queryTiers = await this.state.apolloClient.query({
      query: QUERY_TIER,
    });
    this.setState({tiers: queryTiers})
  }

  QueryEventData = async () => {
    const queryEvents = await this.state.apolloClient.query({
      query: QUERY_EVENT,
    });
    this.setState({events: queryEvents})
  }

  componentDidMount() {
    // this.QueryUserData();
    this.QueryPermissionData();
    this.QueryTierData();
    this.QueryEventData();
    this.QueryAdminData();
  }


  passPropertiesAndRender(Component, props) {
    return <Component
        QueryUserData={this.QueryUserData}
        apolloClient={client}
        {...this.state}
        {...props} />
  }

  render() {
    return (
        <ApolloProvider client={client}>
          <Router>
            <div className="flex-column justify-flex-start min-100-vh">
              <Header/>
              <div className="container">
                <Route exact path="/">
                  <Login  QueryUserData={this.QueryUserData} />
                </Route>
                <Route path="/AdminHome">
                  <AdminHome apolloClient={client}
                    QueryUserData={this.QueryUserData}
                    currentUser = {this.state.currentUser}
                    permissions= {this.state.permissions}
                    tiers= {this.state.tiers}
                    events= {this.state.events}
                    users= {this.state.user}
                    admins= {this.state.admins}
                   />
                </Route>
                <Route path="/ClientHome">
                  <ClientHome/>
                </Route>
                <Route exact path="/signup">
                  <Signup  QueryUserData={this.QueryUserData} />
                </Route>
              </div>
              <Footer/>
            </div>
          </Router>
        </ApolloProvider>
    );
  }
}
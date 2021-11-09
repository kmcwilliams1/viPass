import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminHome from "./components/AdminHome/";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientHome from "./components/ClientHome";

import {
  QUERY_EVENT,
  QUERY_USER,
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
      currentUser: null,
      permissions: null,
      tiers: null,
      events: null,
      admins: null
    }
  }

  // QueryUserData = async () => {
  //   const queryUsers = await this.props.apolloClient.query({
  //     query: QUERY_USER,
  //   });
  //   this.setState({ users: queryUsers })
  // }

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
    // this.QueryAdminData();
  }


  passPropertiesAndRender(Component, props) {
    return <Component
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
                  <Login/>
                </Route>
                <Route path="/AdminHome">
                  <AdminHome apolloClient={client}
                    currentUser = {this.state.currentUser}
                    permissions= {this.state.permissions}
                    tiers= {this.state.tiers}
                    events= {this.state.events}
                    admins= {this.state.admins}
                   />
                </Route>
                <Route path="/ClientHome">
                  <ClientHome/>
                </Route>
                <Route exact path="/signup">
                  <Signup/>
                </Route>
              </div>
              <Footer/>
            </div>
          </Router>
        </ApolloProvider>
    );
  }
}
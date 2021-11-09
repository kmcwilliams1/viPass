import React from "react";
import Redirect from './Redirect';
import PageNotFound from './PageNotFound';
import {
    Route,
    Switch
} from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import AdminHome from "./components/AdminHome/AdminHome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ClientHome from "./components/ClientHome/ClientHome";

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
const authLink = setContext((_, {headers}) => {
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


export default class Bootstrap extends React.Component {
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

    QueryAdminData =  () => {
        const queryAdmins =  this.state.apolloClient.query({
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
            authenticate={this.authenticate}
            changeLoggedInStatus={this.changeLoggedInStatus}
            codeBlock={this.codeBlock}
            semaphoreLock={this.semaphoreLock}
            subRoutingSwitch={this.subRoutingSwitch}
            setCurrentUserObject={this.setCurrentUserObject}
            switchDarkAndLightTheme={this.switchDarkAndLightTheme}
            testRestfulPostPutDeleteResponse={this.testRestfulPostPutDeleteResponse}
            updateUser={this.updateUser}
            {...this.state}
            {...props} />

    }

    subRoutingSwitch = (route, rest) => {
        if (rest === undefined) {
            rest = [];
        }
        return <Switch>
            {route.map((prop, key) => {
                if (prop.redirect) {
                    if (!prop.pathTo) {
                        console.log('bad route redirect,', prop);
                        return "";
                    }
                    return <Redirect
                        exact
                        from={prop.path}
                        to={prop.pathTo}
                        key={key}/>;
                }
                if (prop?.views) {
                    return prop.views.map((x, key) => {
                        return (
                            <Route
                                exact
                                path={x.path}
                                render={y => this.passPropertiesAndRender(x.component, {...x, ...rest, ...y})}
                                key={key}/>
                        );
                    });
                }
                return <Route
                    path={prop.path}
                    render={props => this.passPropertiesAndRender(prop.component, {...prop, ...rest, ...props})}
                    key={key}/>;
            })}
            <Route component={PageNotFound}/>
        </Switch>
    };


    render() {
        let navigation = [
            {
                name: 'Login',
                path: "/",
                component: Login
            },
            {
                name: 'AdminHome',
                path: "/AdminHome(/)*",
                component: AdminHome
            },
            {
                name: 'Signup',
                path: "/Signup(/)*",
                component: Signup
            },
            {
                name: 'ClientHome',
                path: "/ClientHome",
                component: ClientHome
            },

        ];
        return (
            <ApolloProvider client={client}>
                <div className="flex-column justify-flex-start min-100-vh">
                    <Header/>
                    <div className="container">
                        {this.subRoutingSwitch(navigation)}

                    </div>
                    <Footer/>
                </div>
            </ApolloProvider>
        );
    }
}
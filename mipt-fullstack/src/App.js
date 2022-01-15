import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Test from './pages/Test';
import Login from "./pages/Login";
import Rating from "./pages/Rating";
import { instanceOf } from "prop-types";

import {withCookies, Cookies} from "react-cookie";

class App extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        user: this.props.cookies.get("user") || ""
    };

    handleCookie = () => {
        const { cookies } = this.props;
        cookies.set("user", "gowtham", { path: "/" }); // setting the cookie
        this.setState({ user: cookies.get("user") });
    };

    render() {
        return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/test'   component={Test} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/rating' component={Rating} />
                </Switch>
            </Router>
        </>
    );
    }
}

export default withCookies(App);
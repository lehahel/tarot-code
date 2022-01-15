import React from "react";

import LoginTextBox from "./LoginTextBox";
import './LoginForm.css'
import {withRouter} from "react-router-dom";
import {compose} from "redux";

import AuthApi from "../services/AuthApi";

import {withCookies, Cookies} from 'react-cookie'
import {instanceOf} from "prop-types";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.path = props.path;
        this.state = {
            email: '',
            password: '',
            clicked: '',
        }
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    handleLogin = () => {
        AuthApi.Login(this.state.email, this.state.password).then(
            (data) => {
                if (data.status === 200) {
                    this.props.history.push('/');
                    const {cookies} = this.props
                    cookies.set("user_id", data.data.user.id, { path: "/" });
                    cookies.set("access", data.data.access, { path: "/" });
                    cookies.set("refresh", data.data.refresh, { path: "/" });
                    console.log('COOKIEs ADDED')
                }
            })
    }

    setEmail = (evt) => this.setState({email: evt.target.value})
    setPassword = (evt) => this.setState({password: evt.target.value})
    render() {
        return (
            <div className='login_form'>
                <label className='login_label'>Login</label>
                <div className='login_form_block'><LoginTextBox label='email' type='text' updateText={this.setEmail} /></div>
                <div className='login_form_block'><LoginTextBox label='password' type='password' updateText={this.setPassword}/></div>
                <div className='login_form_block'>
                    <button className='login_button' onClick={this.handleLogin}>
                        login
                    </button>
                </div>
                <button className='register_button' onClick={() => {
                    this.setState({clicked: true});
                    this.props.history.push(this.path)
                }}>
                    register
                </button>
            </div>
        )
    }
}

export default compose(withRouter, withCookies)(LoginForm)
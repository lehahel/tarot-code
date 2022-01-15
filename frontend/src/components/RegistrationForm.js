import React from "react";

import LoginTextBox from "./LoginTextBox";
import './RegistrationForm.css'
import {withRouter} from "react-router-dom";
import AuthApi from "../services/AuthApi";
import {instanceOf} from "prop-types";
import {withCookies, Cookies} from "react-cookie";
import {compose} from "redux";

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            login: '',
            email: '',
            password: ''
        }
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    handleRegistration = () => {
        AuthApi.RegisterUser(
            this.state.login, this.state.email, this.state.password, this.state.name, this.state.surname
        ).then(data => { if (data.status === 201) {
            let text = "Something went wrong!"
            if (data.status === 201) {
                text = "Successfully registered!";
                this.props.history.push('/');
                const {cookies} = this.props
                cookies.set("user_id", data.data.user.id, { path: "/" });
                cookies.set("access", data.data.access, { path: "/" });
                cookies.set("refresh", data.data.refresh, { path: "/" });
            } else if (data.status === 400) {
                text = "All the fields should be filled"
            }
            // There should be a notification
            console.log(text)
        }});
    }

    setName = (evt) => this.setState({name: evt.target.value})
    setSurname = (evt) => this.setState({surname: evt.target.value})
    setLogin = (evt) => this.setState({login: evt.target.value})
    setEmail = (evt) => this.setState({email: evt.target.value})
    setPassword = (evt) => this.setState({password: evt.target.value})
    render() {
        return (
            <>
                <div className='form'>
                    <label className='registration_label'>Registration</label>
                    <div className='FormBlock'><LoginTextBox label='name' type='text' updateText={this.setName}    /></div>
                    <div className='FormBlock'><LoginTextBox label='surname' type='text' updateText={this.setSurname} /></div>
                    <div className='FormBlock'><LoginTextBox label='login' type='text' updateText={this.setLogin} /></div>
                    <div className='FormBlock'><LoginTextBox label='email' type='text' updateText={this.setEmail}/></div>
                    <div className='FormBlock'><LoginTextBox label='password' type='password' updateText={this.setPassword}/></div>
                    <button className='registration_button' onClick={this.handleRegistration}>register me</button>
                </div>
            </>
        )
    }
}

export default compose(withRouter, withCookies)(RegistrationForm);

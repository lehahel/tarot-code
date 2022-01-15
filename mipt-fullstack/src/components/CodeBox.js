import React from 'react'

import './CodeBox.css'

import StartButton from '../img/start_button.svg'

import CodeApi from "../services/CodeApi";
import AuthApi from "../services/AuthApi";

import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

class CodeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 'ffcd2b3f-56ea-4789-917b-6e32c9248e7f',
            code_name: 'some code',
            code: '',
            score_text: 'TEST',
            clicked: false,
            access: null,
        }
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    generatePromise() {
        this.setState({code: document.getElementById('textarea').textContent})
        const {cookies} = this.props;

        const refresh = cookies.get('refresh')
        const user_id = cookies.get('user_id')

        let access = null;

        AuthApi.RefreshUser(refresh).then((data) => {
            if (data.status === 200) {
                access = data.data.access;
                this.setState({access: access})
                console.log("1: " + access);
            }
        });
        console.log("2: " + this.state.access)

        let username = null;
        this.sleep(500).then(() => {AuthApi.GetActiveUser(user_id, this.state.access).then((data) => {
            if (data.status === 200) {

                username = data.data.username;
                console.log("USERNAME" + username)
                // username = data.data.username;
                CodeApi.CreateCode(user_id, this.state.code_name, this.state.code).then(
                    (data) => {
                        this.setState({score_text: 'score: ' + data.data.user_code.score});
                    }
                )
            } else {
                this.setState( { score_text: 'ERROR' } );
            }
        })});

    }

    render() {
        return (
            <div>
                <button className={
                    this.state.clicked ? 'clicked'  : 'button_start'}
                        onClick={() => { this.setState({clicked: true}); this.generatePromise()}}
                        onAnimationEnd={() => this.setState({clicked: false})}>
                    <img src={StartButton} alt='start' style={{width: '1.5vw', height: '1.5vw'}}/>
                </button>
                <label className='scorebox'> {this.state.score_text} </label>
                <div className='code_area'>
                    <div id="textarea" className="text_area" contentEditable="true" spellCheck="false" onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            document.execCommand('insertLineBreak')
                            event.preventDefault()
                        }
                    }}> // write your code here <br/>
                        // Divination with beautiful animation is not provided yet. <br/>
                        // For this I must talk to girls who know something about tarot <br/>
                        // but I actually do not know how to talk to girls;(</div>
                </div>
            </div>
        )
    }
}

export default withCookies(CodeBox);

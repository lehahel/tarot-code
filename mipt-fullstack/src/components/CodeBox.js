import React from 'react'

import './CodeBox.css'

import StartButton from '../img/start_button.svg'

import CodeApi from "../services/CodeApi";

export default class CodeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 'ffcd2b3f-56ea-4789-917b-6e32c9248e7f',
            code_name: 'some code',
            code: '',
            score_text: 'TEST',
            clicked: false,
        }
    }

    generatePromise() {
        CodeApi.CreateCode(this.state.user_id, this.state.code_name, this.state.code).then(
            // should get data from back
            (data) => { this.setState({score_text: 'score: 1000'}) }
        )
    }

    render() {
        return (
            <div>
                <div className='note'></div>
                <button className={
                    this.state.clicked ? 'clicked'  : 'button_start'}
                        onClick={() => this.setState({clicked: true})}
                        onAnimationEnd={() => this.setState({clicked: false})}>
                    <img src={StartButton} alt='start' style={{width: '1.5vw', height: '1.5vw'}}/>
                </button>
                <label className='scorebox'>score: 1230</label>
                <div className='code_area'>
                    <div  className="text_area" contentEditable="true" spellCheck="false" onKeyDown={(event) => {
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
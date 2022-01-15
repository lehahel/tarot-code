import React from "react";

import './LoginTextBox.css'

export default class LoginTextBox extends React.Component {
    constructor(props) {
        super(props);
        this.updateText = props.updateText;
        this.label = props.label;
        this.type = props.type;
    }
    render() {
        return (
            <div>
                <div className='grey_rectangle'>
                    <label className='text_box_label'>{this.label}</label>
                    <input
                        className='text_box'
                        type = {this.type}
                        onChange = {evt => {
                            this.updateText(evt);
                        }}
                    />
                </div>
            </div>
        )
    }
}
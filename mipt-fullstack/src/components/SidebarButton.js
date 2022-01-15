import './SidebarButton.css'
import React from "react";
import {withRouter} from "react-router-dom";

class SidebarButton extends React.Component {
    constructor(props) {
        super(props);
        this.path = props.path;
        this.text = props.text;
        this.state = {clicked: false};
    }

    render() {
        const clicked = this.state.clicked;
        return (
            <button
                onClick={() => {
                    this.setState({clicked: true});
                    this.props.history.push(this.path)
                }}
                onAnimationEnd={() => this.setState({clicked: false})}
                className={
                    clicked ? 'sidebar-button-click'  : 'sidebar-button'
                }>
                {this.text}
            </button>
        )
    }
}

export default withRouter(SidebarButton)

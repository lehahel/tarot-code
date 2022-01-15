import React from "react";

import RedCard from '../img/red_card.svg'
import GreenCard from '../img/green_card.svg'
import PinkCard from '../img/pink_card.svg'
import BlueCard from '../img/blue_card.svg'
import YellowCard from '../img/yellow_card.svg'

import './Card.css'

const CardMatching = {
    'red'   : RedCard,
    'green' : GreenCard,
    'pink'  : PinkCard,
    'blue'  : BlueCard,
    'yellow': YellowCard
}

const PositionMatching = {
    1: {left: '20vw', top: '75vh'},
    2: {left: '35vw', top: '60vh'},
    3: {left: '50vw', top: '45vh'},
    4: {left: '65vw', top: '30vh'},
    5: {left: '80vw', top: '15vh'}
}

const ShadowPositionMatching = {
    1: {left: '22vw', top: '72vh'},
    2: {left: '37vw', top: '57vh'},
    3: {left: '52vw', top: '42vh'},
    4: {left: '67vw', top: '27vh'},
    5: {left: '82vw', top: '12vh'}
}

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.card_color = props.card_color;
        this.style = PositionMatching[props.position]
        this.shadow = ShadowPositionMatching[props.position]
        this.state = {clicked: false};
    }

    render() {
        const card = CardMatching[this.card_color]
        return (
            <div>
                <div className='card-shadow' style={this.shadow}>
                </div>
                <img
                    src={card}
                    className={this.state.clicked ? 'card-clicked' : 'card'}
                    style={this.style}
                    alt='card'
                    onClick={() => this.setState({clicked: true})}
                    onAnimationEnd={() => this.setState({clicked: false})}
                />
            </div>
        )
    }
}
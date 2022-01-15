import React from 'react';

import Card from './../components/Card'

function Home() {
    return (
        <div className='home'>
            <Card card_color='red'    position={1} />
            <Card card_color='blue'   position={2} />
            <Card card_color='green'  position={3} />
            <Card card_color='pink'   position={4} />
            <Card card_color='yellow' position={5} />
        </div>
    );
}

export default Home;
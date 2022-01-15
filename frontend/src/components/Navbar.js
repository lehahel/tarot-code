import React from 'react';
import './Navbar.css';
import './SidebarButton.css'
import "typeface-permanent-marker"
import "typeface-chakra-petch"
import SidebarButton from './SidebarButton'

function Navbar() {
    return (
        <>
            <div className='nav-menu-shadow'/>
            <div className={'nav-menu active'}>
                <ul className='nav-menu-items'>
                    <SidebarButton text='home' path='/'/>
                    <SidebarButton text='test' path='/test'/>
                    <SidebarButton text='login' path='/login'/>
                    <SidebarButton text='rating' path='/rating'/>
                    <SidebarButton text='donate' path='/donate'/>
                </ul>
            </div>
            <div className='navbar'/>
        </>
    );
}

export default Navbar;
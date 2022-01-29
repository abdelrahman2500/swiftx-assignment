import React from 'react';
import HeaderNavigation from '../header-navigation/HeaderNavigation';
import './index.css'
import Logo from './../logo/Logo';
import NavbarActions from './../navbar-actions/NavbarActions';

export default function Navbar({data, cartLength, curr, setCurr}) {
    return(
        <div className='navbar'>
            <div className='navigation'>
            <div className='navigation__section'>
                <HeaderNavigation data={data} />
            </div>
            <div className='navigation__section'>
                <Logo />
            </div>
            <div className='navigation__section'>
                <NavbarActions cartLength={cartLength} curr={curr} setCurr={setCurr} /> 
            </div>
            </div>
        </div>
    )
}

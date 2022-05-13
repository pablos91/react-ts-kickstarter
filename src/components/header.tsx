import { useSampleContext } from 'contexts/sampleContext';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import "./header.scss";

export const NavHeader = () => {

    const [{ backgroundColor }] = useSampleContext();

    return (
        <header className='header-container' style={{ background: backgroundColor }}>
            <img alt="logo" src={require('images/logo.png')} className="header-logo" />

            <NavLink className="header-link" to="/">MainPage</NavLink>
            <NavLink className="header-link" to="/login">LoginPage</NavLink>
            <NavLink className="header-link" to="/otherpage/1234">OtherPage</NavLink>
        </header>
    )
}
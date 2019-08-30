import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const NavHeader = ({color}) => (
    <header style={{ "background": color }}>
        <img src={require('../../images/logo.png')} className="logo" />
        {/* remember to use require when linking to binaries. webpack will make proper transformations to it */}
        <a href="/index.html">Strona główna</a>
        <a href="/otherpage.html">Inna strona</a>

    </header>
)
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { NavLink } from 'react-router-dom';

export const NavHeader = hot(({color}) => (
    <header style={{ "background": color }}>
        <img src={require('../../images/logo.png')} className="logo" />
        {/* remember to use require when linking to binaries. webpack will make proper transformations to it */}
        <a href="/index.html">Strona główna</a>
        <a href="/otherpage.html">Inna strona</a>

    </header>
))
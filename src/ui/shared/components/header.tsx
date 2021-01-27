import { useObserver } from 'mobx-react';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { NavLink } from 'react-router-dom';
import { useStores } from '../sharedLogic';

export const NavHeader = hot(() => {

    const { globalCtx } = useStores();

    return useObserver(() => (
        <header style={{ "background": globalCtx.color }}>
            <img src={require('images/logo.png')} className="logo" />
            {/* remember to use require when linking to binaries. webpack will make proper transformations to it */}
            <NavLink to="/">Strona główna</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/otherpage">Inna strona</NavLink>

        </header>
    ))
})
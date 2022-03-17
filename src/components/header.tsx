import { useSampleContext } from 'contexts/sampleContext';
import * as React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const NavHeader = () => {

    const { backgroundColor } = useSampleContext();

    useEffect(() => {
        console.log(backgroundColor)
    }, [backgroundColor])

    return (
        <header style={{ "backgroundColor": backgroundColor }}>
            <img src={require('images/logo.png')} className="logo" />
            {/* remember to use require when linking to binaries. webpack will make proper transformations to it */}
            <NavLink to="/">Strona główna</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/otherpage">Inna strona</NavLink>

        </header>
    )
}
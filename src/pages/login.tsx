import { useObserver } from 'mobx-react';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { LoginContainer } from 'ui/login/containers/loginContainer';

export const LoginPage = hot(() => {
    return useObserver(() => (
        <>
            <LoginContainer />
        </>
    ))
})
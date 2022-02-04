import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { getItem } from "../helpers/localstorage";

const GuardedRoute = ({ component: Component, ...rest }) => {
    const auth= !!getItem("PHPTOKEN");
    return <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
}

export default GuardedRoute;
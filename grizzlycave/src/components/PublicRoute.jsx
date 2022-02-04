import { Redirect, Route } from "react-router";
import { getItem } from "../helpers/localstorage";


export const PublicRoute = ({ component: Component, ...rest }) => {
    const auth = !!getItem("PHPTOKEN");
    return <Route {...rest} render={(props) => (
        auth === true
            ? <Redirect to='/profile'/>
            : <Component {...props} />
    )} />
};
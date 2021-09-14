import React from 'react'
import { Redirect, Route } from "react-router-dom"
import { AuthContext } from "helpers/AuthContext"


export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = React.useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props => 
                user !== null ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/signin" />
                )
            }
        />
    )
}

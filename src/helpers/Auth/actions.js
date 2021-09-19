import login from "services/auth/login";

export async function loginUser(dispatch, loginPayload) {
    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await login.getToken(
            loginPayload,
            `?username=${loginPayload.username}&password=${loginPayload.password}`
        );
        let data = await response.data;

        if (data) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            localStorage.setItem('currentUser', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
        console.log(data.errors[0]);
        return;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}
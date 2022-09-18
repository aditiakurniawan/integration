import { Navigate, Outlet } from 'react-router-dom';
import user from "./fakeData/user.json";

export function IsLoginRoute() {
    if (localStorage.getItem("dataLogin") != null) {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }
}

/* eslint-disable */
export function IsAdminRoute() {
    let isAdmin = false;
    const dataLogin = JSON.parse(localStorage.getItem("dataLogin"));
    const email = dataLogin.email;
    const password = dataLogin.password;
    const data = user?.filter(
        (item) => item.email == email && item.password == password
    );
    data[0].role == "admin" ? isAdmin = true : isAdmin = false

    if (isAdmin) {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }
}
import { Navigate, Outlet } from "react-router-dom";
import user from "./fakeData/user.json";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

export function IsLoginRoute() {
  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  if (state.isLogin != null) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
}

/* eslint-disable */
export function IsAdminRoute() {
  const [state, dispatch] = useContext(UserContext);
  let isAdmin = false;
  const dataLogin = JSON.parse(state);
  const email = dataLogin.email;
  const password = dataLogin.password;
  const data = user?.filter(
    (item) => item.email == email && item.password == password
  );
  data.data.role == "Admin" ? (isAdmin = true) : (isAdmin = false);

  if (isAdmin) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
}

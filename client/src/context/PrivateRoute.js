import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./auth";
import { Routes, Route, redirect , Outlet} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [ok, setOk] = useState(false);
  const {
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    adminLoggedIn,
    setAdminLoggedIn,
  } = useContext(UserContext);

  useEffect(() => {
    const authCheck =async () => {
        // const res = axios()
    }
  },[])

  return (
    <>
      ok? <Outlet/>:'spinner'
      </>
  );
};

export default PrivateRoute;

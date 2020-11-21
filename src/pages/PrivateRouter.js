import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";
import SignIn from "./SignIn";

const PrivateRouter = ({ component: RouteComponent, ...options }) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? RouteComponent : SignIn;

  return <Route {...options} component={Component} />;
};

export default PrivateRouter;

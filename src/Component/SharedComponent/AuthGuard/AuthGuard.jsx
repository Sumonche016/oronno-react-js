import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectAccessToken } from "../../../Redux/auth/selectAuth";

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);

  return accessToken ? (
    children
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;

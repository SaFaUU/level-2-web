import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentToken, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  let user;

  if (token){
    user = verifyToken(token);
  }

  console.log(user);

  const dispatch = useAppDispatch();

  if (user?.role !== role && role !== undefined) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isAuth, redirectPath, component }) => {
  if (isAuth === undefined) {
    return;
  }
  return isAuth ? component : <Navigate to={redirectPath} replace />;
};

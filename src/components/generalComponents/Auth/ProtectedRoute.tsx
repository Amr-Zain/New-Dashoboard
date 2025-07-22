// import { hasPermission } from '@/helper/authHelpers';
// import { Navigate } from 'react-router-dom';

// interface ProtectedRouteTypes {
//     activePermission?: boolean;
//     permission?: string;
//     children: React.ReactNode;
// }

// const ProtectedRoute = ({ activePermission = false, permission, children }: ProtectedRouteTypes) => {
//     return activePermission ?
//      hasPermission(permission) ? ( children) : ( <Navigate to="/permission-required" />)
//      : children;
// };

// export default ProtectedRoute;




/* 
import Cookies from "js-cookie";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  requiredAuth?: boolean; 
  notAllowedAuth?: boolean; 
}

const ProtectRouter = ({ children, requiredAuth }: Props) => {
  const user_token = Cookies.get("user_token");

  if (requiredAuth && !user_token) {
    return <Navigate to="/login" replace />;
  }

  if (!requiredAuth && user_token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectRouter;

*/

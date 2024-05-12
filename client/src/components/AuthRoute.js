import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function AuthRoute({ children }) {
  const { authUser } = useAuthContext();
  const location = useLocation();

  return authUser ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}

export default AuthRoute;

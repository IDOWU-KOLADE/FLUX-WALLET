import { Navigate } from "react-router-dom";
import { useApp } from "../../CONTEXT/AppContext";

export function ProtectedRoute({ children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/" replace />;
  return children;
}
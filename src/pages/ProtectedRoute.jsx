import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticating } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticating) navigate("/");
  }, [isAuthenticating, navigate]);

  return isAuthenticating ? children : null;
}

import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const ProtectedPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <div>Contenu de la page protégée.</div>;
};

export default ProtectedPage;

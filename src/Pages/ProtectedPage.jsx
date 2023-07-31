import { useContext } from "react";
import { redirect } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const ProtectedPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    redirect("/");
  }

  return <div>Contenu de la page protégée.</div>;
};

export default ProtectedPage;

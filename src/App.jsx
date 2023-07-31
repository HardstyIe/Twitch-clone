import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";

import { AuthProvider } from "./Contexts/AuthContext";
import Homepage from "./Pages/Homepage";
import Notfound from "./Pages/Notfound";
import ProtectedPage from "./Pages/ProtectedPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

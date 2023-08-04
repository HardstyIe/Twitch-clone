import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from './Components/Navbar/Navbar';
import { AuthProvider } from "./Contexts/AuthContext";
import Homepage from "./Pages/Homepage";
import Notfound from "./Pages/Notfound";
import ProtectedPage from "./Pages/ProtectedPage";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
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

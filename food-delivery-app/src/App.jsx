import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Foodcard from "./components/Foodcard";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register"; // Ensure correct import


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar />
        <div className="container flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/foodcard" element={<Foodcard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/register" element={<Register />} /> {/* Ensure this is present */}
            
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
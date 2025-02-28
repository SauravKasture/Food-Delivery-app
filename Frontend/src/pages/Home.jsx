// pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ userRole, userName }) => {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false); // State for welcome toast

  // Simulate login functionality
  const handleLogin = () => {
    navigate("/login");
  };

  // Show welcome toast for logged-in users only once per session
  useEffect(() => {
    if (userRole !== "guest") {
      const welcomeMessageShown = sessionStorage.getItem("welcomeMessageShown");
      if (welcomeMessageShown === "false") {
        console.log("Welcome message condition met. Showing toast...");
        setShowWelcomeToast(true); // Show toast
        sessionStorage.setItem("welcomeMessageShown", "true"); // Mark as shown

        // Automatically hide toast after 1.5 seconds
        const timer = setTimeout(() => {
          console.log("Hiding welcome toast after 1.5 seconds...");
          setShowWelcomeToast(false);
        }, 1500); // 1.5 seconds

        // Cleanup the timer when the component unmounts or when the toast is dismissed
        return () => {
          console.log("Clearing timeout...");
          clearTimeout(timer);
        };
      }
    }
  }, [userRole]);

  return (
    <div>
      {/* Welcome Toast Message */}
      {showWelcomeToast && userRole !== "guest" && (
        <div
          className="position-fixed top-50 start-50 translate-middle w-45 bg-success text-white text-center py-4 rounded shadow"
          style={{
            width: "45vw", // 45% of the screen width
            zIndex: 9999,
            cursor: "pointer",
          }}
          onClick={() => {
            console.log("Toast clicked. Hiding toast...");
            setShowWelcomeToast(false); // Hide toast on click
          }}
        >
          <h4 className="mb-0">Welcome, {userName}!</h4>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="hero-section text-center text-white py-5"
        style={{
          background: "linear-gradient(to right, #ff6a00, #ee0979)",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h1 className="fw-bold display-4">🍕 Hungry? Order Now! 🍔</h1>
          <p className="lead">Delicious food delivered hot & fresh to your doorstep. 🍽️</p>
          {userRole === "guest" ? (
            <div>
              <button
                className="btn btn-danger btn-lg mt-3 me-2"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="btn btn-outline-light btn-lg mt-3"
                onClick={() => setShowRegisterModal(true)}
              >
                Register
              </button>
            </div>
          ) : (
            <Link to="/menu" className="btn btn-danger btn-lg mt-3">
              Explore Menu
            </Link>
          )}
        </div>
      </section>

      {/* Food Categories */}
      <section className="container my-5 text-center">
        <h2 className="fw-bold">🍽️ Browse By Category</h2>
        <p>Find your favorite meals easily!</p>
        <div className="row g-4">
          {[
            { name: "Vegetarian", img: "https://imgs.search.brave.com/Hu6w4ttMbaP9nALCYgrouHmc_gIKSEgvxyVIzJgbYrQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzk5LzY2LzE2/LzM2MF9GXzk5NjYx/NjUyXzcycTdmNnJH/YVE1NzFLWVZraDRz/RjFXUHkyNlN1QWtz/LmpwZw" },
            { name: "Non-Vegetarian", img: "https://imgs.search.brave.com/9_QeSLZtkkpOZdl_lR_IuXfplZLALDgxpvsGYzouoD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDk0/MzUwMzI3L3Bob3Rv/L211dHRvbi1jdXJy/eS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9aFZIZ1d0a0tG/c1FLb3JLVmszMFJh/YkFMcV8wOWdKUjBU/c1U0UDBSWkRmZz0" },
            { name: "Indian Sweets", img: "https://imgs.search.brave.com/gSk5mCDmi6gjnnoUpUB98ryVSTY2UT-W2aMHKbKuzmQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbmRpYW4tc3dl/ZXRzLXBsYXRlLWlu/Y2x1ZGVzLWd1bGFi/LWphbXVuLXJhc2d1/bGxhLWthanUta2F0/bGktbW9yaWNob29y/LWJ1bmRpLWxhZGR1/LWd1aml5YV85OTk3/NjYtMjQxNy5qcGc_/c2VtdD1haXNfaHli/cmlk" },
            { name: "Drinks", img: "https://imgs.search.brave.com/Y9D2lCfSZNbhS7EVEjtsiqPUhKn53fUomXgEHAsXJds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzgzLzQzLzM1/LzM2MF9GXzgzNDMz/NTk0XzB4bzBNNHI4/V1BKRnFWa3RGVXU3/dWJrbjgzMXQ0a3B1/LmpwZw" },
          ].map((category, index) => (
            <div key={index} className="col-md-3">
              <div className="card shadow-sm h-100">
                <img
                  src={category.img}
                  className="card-img-top"
                  alt={category.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{category.name}</h5>
                  {userRole === "guest" ? (
                    <button
                      className="btn btn-outline-danger mt-auto"
                      onClick={() => setShowRegisterModal(true)}
                    >
                      Login to Explore
                    </button>
                  ) : (
                    <Link to="/menu" className="btn btn-outline-danger mt-auto">
                      Explore
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers (Visible Only to Registered Users) */}
      {userRole !== "guest" && (
        <section className="bg-light py-5">
          <div className="container text-center">
            <h2 className="fw-bold">🔥 Special Offers</h2>
            <p>Don't miss out on our best deals!</p>
            <div className="row g-4">
              {[
                { name: "Family Feast", price: "₹499", img: "https://imgs.search.brave.com/Rl_VsugheUWRDVdTsMPQpm65rvqrk8yp1EmzeiK2qTM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/ODYxMDU2Ni9waG90/by9mYW1pbHktbWVl/dGluZy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9OTNkUEZ1/Q1UwZ2p2ZDVHOGo5/N2IzaHRuVFJBbFl0/aUZxTjhJS0hxSWJy/az0" },
                { name: "Party Platter", price: "₹899", img: "https://imgs.search.brave.com/3Lk8MrezkpQ5CT5tOtEJbd20Z2jankOhQYv0M0sSvyk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2hpY2stZmlsLWEu/Y29tLy0vbWVkaWEv/aW1hZ2VzL2NmYWNv/bS9uZXctY2F0ZXJp/bmcvZGVzc2VydHMu/anBn" },
                { name: "Dessert Combo", price: "₹349", img: "https://imgs.search.brave.com/7GijC3pFLvvlozyXtKiZkVp-zOwoNZplpP2iqsn1krM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLW8v/MGEvZGIvNTYvYmEv/ZGVzc2VydC1jb21i/by1jaG9jb2xhdGUu/anBn" },
              ].map((offer, index) => (
                <div key={index} className="col-md-4">
                  <div className="card shadow-sm h-100">
                    <img
                      src={offer.img}
                      className="card-img-top"
                      alt={offer.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{offer.name}</h5>
                      <p className="text-danger fw-bold">{offer.price}</p>
                      <button className="btn btn-danger mt-auto">Order Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call To Action */}
      <section
        className="cta-section text-center text-white py-5"
        style={{
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        }}
      >
        <h2 className="fw-bold">🚀 Order Your Favorite Meal Now!</h2>
        <p>Get delicious food delivered to your doorstep with just one click.</p>
        {userRole === "guest" ? (
          <button
            className="btn btn-light btn-lg"
            onClick={() => setShowRegisterModal(true)}
          >
            Register to Get Started
          </button>
        ) : (
          <Link to="/menu" className="btn btn-light btn-lg">
            Browse Menu
          </Link>
        )}
      </section>

      {/* Register Modal */}
      {showRegisterModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Join Us Today! 🍕</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRegisterModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted">
                  Register now to unlock exclusive features like ordering food, tracking
                  deliveries, and accessing special offers!
                </p>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    setShowRegisterModal(false);
                    navigate("/register");
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
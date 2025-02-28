// pages/About.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const About = ({ userRole }) => {
  const navigate = useNavigate();

  // Simulate login functionality
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      {/* Page Header */}
      <h2 className="text-center mb-4">About Us</h2>
      <p className="text-center text-muted">
        Discover our journey, our mission, and why we are the best in food delivery.
      </p>

      {/* Section 1: Who We Are */}
      <div className="row align-items-center my-5">
        <div className="col-md-6">
          <h3>Who We Are</h3>
          <p>
            We are a passionate team dedicated to bringing delicious food straight to your doorstep. 
            Our platform connects food lovers with the best restaurants, offering a wide variety of 
            cuisines at your fingertips.
          </p>
          {userRole === "guest" && (
            <button
              className="btn btn-danger"
              onClick={handleLogin}
            >
              Login to Explore More
            </button>
          )}
        </div>
        <div className="col-md-6">
          <img
            src="https://imgs.search.brave.com/qzVOUbIgDqFObMyMJNZwAadKhTLXygHTucPMNce16WM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/b29kLWRlbGl2ZXJ5/LW1hbi13aXRoLWJv/eGVzLXdpdGgtZm9v/ZF8xMzAzLTI3NzIz/LmpwZz9zZW10PWFp/c19oeWJyaWQ"
            alt="Our team"
            className="img-fluid rounded"
          />
        </div>
      </div>

      {/* Section 2: Our Mission */}
      <div className="row align-items-center my-5">
        <div className="col-md-6 order-md-2">
          <h3>Our Mission</h3>
          <p>
            Our mission is to provide a seamless and enjoyable food ordering experience. 
            We strive to support local businesses while delivering high-quality meals 
            to our customers quickly and efficiently.
          </p>
          {userRole === "admin" && (
            <Link to="/admin/dashboard" className="btn btn-primary">
              Go to Admin Dashboard
            </Link>
          )}
        </div>
        <div className="col-md-6 order-md-1">
          <img
            src="https://imgs.search.brave.com/CAQbEHEhzM64Gv6czz4liX8nU_Uk_JBUsQ_FKeWqw5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5saWNkbi5jb20v/ZG1zL2ltYWdlL0M0/RTEyQVFHQmxPTXF1/MFJXTmcvYXJ0aWNs/ZS1jb3Zlcl9pbWFn/ZS1zaHJpbmtfNzIw/XzEyODAvMC8xNjQx/NzI1NTk5MzQzP2U9/MjE0NzQ4MzY0NyZ2/PWJldGEmdD1qcjhr/QnlzczMzV0Y1RHU2/UlRDdExqelZSaTI5/R0VOamM3NHVaTV9I/RkFZ"
            alt="Our mission"
            className="img-fluid rounded"
          />
        </div>
      </div>

      {/* Section 3: Why Choose Us */}
      <div className="row align-items-center my-5">
        <div className="col-md-6">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>🚀 **Fast & Reliable Delivery** – Get your food in under 30 minutes.</li>
            <li>🍕 **Diverse Menu Options** – Choose from hundreds of dishes.</li>
            <li>💳 **Secure Payments** – Multiple payment options including UPI & wallets.</li>
            <li>🌍 **Eco-Friendly Packaging** – We care about sustainability.</li>
          </ul>
          {userRole === "user" && (
            <Link to="/menu" className="btn btn-success">
              Explore Menu
            </Link>
          )}
        </div>
        <div className="col-md-6">
          <img
            src="https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Why choose us"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
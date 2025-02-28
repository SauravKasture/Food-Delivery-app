// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ userRole }) => {
  return (
    <footer className="bg-dark py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* About Us */}
          <div className="col-md-3">
            <h5 className="text-warning">About Us</h5>
            <p className="text-light mb-0">
              We are passionate about delivering delicious food to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-light">
                  About Us
                </Link>
              </li>
              {userRole === "guest" && (
                <>
                  <li>
                    <Link to="/login" className="text-light">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-light">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {userRole === "user" && (
                <>
                  <li>
                    <Link to="/menu" className="text-light">
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="text-light">
                      Orders
                    </Link>
                  </li>
                </>
              )}
              {userRole === "admin" && (
                <li>
                  <Link to="/admin/dashboard" className="text-light">
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-md-3">
            <h5 className="text-warning">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="text-light">Email: support@foodie.com</li>
              <li className="text-light">Phone: +91 123 456 7890</li>
              <li className="text-light">Address: 123 Food Street, City</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3">
            <h5 className="text-warning">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center text-light mb-0">
          &copy; {new Date().getFullYear()} Foodie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
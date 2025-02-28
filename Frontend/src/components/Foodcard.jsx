// components/Foodcard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Foodcard = ({ name, price, img, category }) => {
  return (
    <div className="card shadow-sm h-100">
      <img
        src={img}
        className="card-img-top"
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="text-muted">{category}</p>
        <p className="text-danger fw-bold">₹{price}</p>
        <Link to="/cart" className="btn btn-danger mt-auto">
          Add to Cart
        </Link>
      </div>
    </div>
  );
};

export default Foodcard;
import React from "react";

const Foodcard = ({ name, price, img }) => {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img src={img} className="card-img-top" alt={name} style={{ height: "150px", objectFit: "cover" }} />
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">₹{price}</p>
        <button className="btn btn-success">Add to Cart 🛒</button>
      </div>
    </div>
  );
};

export default Foodcard;
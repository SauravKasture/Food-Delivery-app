import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartBadge = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
      {cartCount > 0 ? cartCount : ""}
    </span>
  );
};

export default CartBadge;
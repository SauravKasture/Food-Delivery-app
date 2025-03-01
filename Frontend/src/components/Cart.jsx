// import React from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";

// const Cart = ({ cartItems, removeFromCart }) => {
//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p className="text-center text-muted">Your cart is empty.</p>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <Row key={item.id} className="mb-3 align-items-center">
//               <Col xs={8}>
//                 <h5>{item.name}</h5>
//                 <p>₹{item.price} x {item.quantity}</p>
//               </Col>
//               <Col xs={4} className="text-end">
//                 <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
//                   Remove
//                 </Button>
//               </Col>
//             </Row>
//           ))}
//           <Row className="mt-4">
//             <Col>
//               <h4 className="text-end">Total: ₹{calculateTotal()}</h4>
//             </Col>
//           </Row>
//           <Row className="mt-3">
//             <Col>
//               <Button variant="success" className="w-100">
//                 Proceed to Checkout
//               </Button>
//             </Col>
//           </Row>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Cart;
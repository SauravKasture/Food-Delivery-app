import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Checkout = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Checkout</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your address" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select>
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Cash on Delivery</option>
          </Form.Select>
        </Form.Group>
        <Button variant="success" className="w-100">
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const OrderHistory = () => {
  // Sample data for past orders
  const orders = [
    {
      id: 1,
      date: "2023-10-01",
      items: ["Pizza", "Burger"],
      total: 450,
    },
    {
      id: 2,
      date: "2023-09-25",
      items: ["Pasta", "Salad"],
      total: 300,
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-center text-muted">No past orders found.</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Order #{order.id}</Card.Title>
              <Card.Text>
                <strong>Date:</strong> {order.date}
                <br />
                <strong>Items:</strong> {order.items.join(", ")}
                <br />
                <strong>Total:</strong> ₹{order.total}
              </Card.Text>
              <Button variant="primary" size="sm">
                Reorder
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;
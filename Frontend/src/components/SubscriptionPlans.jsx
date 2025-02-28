import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const SubscriptionPlans = () => {
  // Sample data for subscription plans
  const plans = [
    {
      id: 1,
      title: "Basic Plan",
      price: "$10/month",
      features: ["3 meals per week", "Free delivery", "Standard recipes"],
    },
    {
      id: 2,
      title: "Premium Plan",
      price: "$20/month",
      features: ["5 meals per week", "Free delivery", "Chef-curated recipes"],
    },
    {
      id: 3,
      title: "Ultimate Plan",
      price: "$30/month",
      features: ["7 meals per week", "Free delivery", "Exclusive recipes"],
    },
  ];

  return (
    <Container className="mt-4">
      {/* Section Title */}
      <h2 className="text-center mb-4">Subscription Plans</h2>
      <p className="text-center text-muted mb-5">
        Get daily meals delivered at a discounted price.
      </p>

      {/* Subscription Plans Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {plans.map((plan) => (
          <Col key={plan.id}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title className="fw-bold">{plan.title}</Card.Title>
                <Card.Text className="display-6 text-primary">{plan.price}</Card.Text>
                <ul className="list-unstyled">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-check-circle me-2 text-success"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="success" className="w-100 mt-3">
                  Subscribe Now 🛒
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SubscriptionPlans;
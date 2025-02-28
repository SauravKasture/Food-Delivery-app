import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const MealKits = () => {
  // Sample data for meal kits
  const mealKits = [
    {
      id: 1,
      title: "Pasta Primavera",
      description: "Fresh vegetables and pasta in a light sauce.",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 2,
      title: "Chicken Stir Fry",
      description: "Quick and easy chicken stir fry with veggies.",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 3,
      title: "Beef Tacos",
      description: "Spiced beef filling with taco shells and toppings.",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
  ];

  return (
    <Container className="mt-4">
      {/* Section Title */}
      <h2 className="text-center mb-4">Meal Kits</h2>
      <p className="text-center text-muted mb-5">
        Pre-portioned ingredients for you to cook at home.
      </p>

      {/* Meal Kits Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {mealKits.map((kit) => (
          <Col key={kit.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={kit.image} alt={kit.title} />
              <Card.Body>
                <Card.Title>{kit.title}</Card.Title>
                <Card.Text>{kit.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MealKits;
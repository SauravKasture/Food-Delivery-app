import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ChefRecommendations = () => {
  // Sample data for recommended dishes
  const recommendations = [
    {
      id: 1,
      title: "Grilled Salmon",
      description: "Freshly grilled salmon with herbs and lemon.",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "A healthy mix of fresh vegetables in a savory sauce.",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 3,
      title: "Beef Steak",
      description: "Juicy beef steak cooked to perfection.",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
  ];

  return (
    <Container className="mt-4">
      {/* Section Title */}
      <h2 className="text-center mb-4">Chef's Recommendations</h2>
      <p className="text-center text-muted mb-5">
        Top dishes selected by our chefs for you.
      </p>

      {/* Recommendations Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {recommendations.map((dish) => (
          <Col key={dish.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={dish.image} alt={dish.title} />
              <Card.Body>
                <Card.Title>{dish.title}</Card.Title>
                <Card.Text>{dish.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ChefRecommendations;
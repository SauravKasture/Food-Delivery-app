import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const DietMenus = () => {
  // Sample data for diet-friendly menus
  const dietMenus = [
    {
      id: 1,
      title: "Keto Diet",
      description: "Low-carb, high-fat meals for weight loss.",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 2,
      title: "Vegan Diet",
      description: "Plant-based meals rich in nutrients.",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 3,
      title: "Gluten-Free Diet",
      description: "Meals free from gluten for sensitive diets.",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
  ];

  return (
    <Container className="mt-4">
      {/* Section Title */}
      <h2 className="text-center mb-4">Diet-Friendly Menus</h2>
      <p className="text-center text-muted mb-5">
        Healthy meals designed for different diets.
      </p>

      {/* Diet Menus Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {dietMenus.map((menu) => (
          <Col key={menu.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={menu.image} alt={menu.title} />
              <Card.Body>
                <Card.Title>{menu.title}</Card.Title>
                <Card.Text>{menu.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DietMenus;
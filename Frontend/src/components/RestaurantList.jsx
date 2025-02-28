import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const RestaurantList = () => {
  // Sample data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Pizza Hut",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Burger King",
      image: "https://via.placeholder.com/150",
      rating: 4.2,
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Restaurants</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {restaurants.map((restaurant) => (
          <Col key={restaurant.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={restaurant.image} alt={restaurant.name} />
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>Rating: {restaurant.rating}/5</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RestaurantList;
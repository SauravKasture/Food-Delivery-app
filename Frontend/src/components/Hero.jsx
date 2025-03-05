import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Hero = () => {
  return (
    <div
      className="hero text-light text-center py-5"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x600')", // Replace with actual image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "600px", // Adjust height as needed
      }}
    >
      <Container className="d-flex flex-column justify-content-center h-100">
        <Row>
          <Col>
            <h1 className="display-4 fw-bold mb-4">Delicious Food, Delivered to You</h1>
            <p className="lead mb-4">Order now and enjoy your favorite meals at home.</p>
            <div className="d-flex justify-content-center gap-3">
              <Button variant="light" size="lg" className="px-4">
                Order Now 🛒
              </Button>
              <Button variant="outline-light" size="lg" className="px-4">
                View Menu 🍽️
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
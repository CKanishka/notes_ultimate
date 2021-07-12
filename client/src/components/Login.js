import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import Banner from "../assets/images/banner.png";

const LoginForm = ({ handleSignIn, routeToRegister }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    handleSignIn(form);
  };

  return (
    <Col lg={8} className="mx-auto my-5 flex-grow-1">
      <Container className="box-container p-3">
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email-id"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mr-3"
                onClick={handleLoginClick}
              >
                SignIn
              </Button>
              <span className="align-bottom text-muted">
                Not an existing user?{" "}
                <Button
                  variant="link"
                  type="submit"
                  onClick={routeToRegister}
                  className="p-0 align-baseline"
                >
                  Register
                </Button>
              </span>
            </Form>
          </Col>
          <Col md={6}>
            <img alt="banner" src={Banner} className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </Col>
  );
};
export default LoginForm;

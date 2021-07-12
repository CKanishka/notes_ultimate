import React, { Component } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import Banner from "../assets/images/banner.png";

class RegisterForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.password2) {
      this.props.handleRegister(this.state.email, this.state.password);
    } else {
      alert("Passwords do not match");
    }
  };
  render() {
    return (
      <Col lg="8" className="mx-auto my-5 flex-grow-1">
        <Container className="btn-container p-3">
          <Row>
            <Col md={6}>
              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email-id"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="password2"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleRegister}
                  className="mr-3"
                >
                  Register
                </Button>
                <span className="align-bottom text-muted">
                  Already Registered?{" "}
                  <Button
                    variant="link"
                    type="submit"
                    onClick={this.props.routeToLogin}
                    className="p-0 align-baseline"
                  >
                    Login
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
  }
}

export default RegisterForm;

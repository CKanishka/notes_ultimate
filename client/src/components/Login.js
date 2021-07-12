import React, { Component } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import Banner from "../assets/images/banner.png";
class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.handleSignIn(this.state.email, this.state.password);
  };
  render() {
    return (
      <Col lg={8} className="mx-auto my-5 flex-grow-1">
        <Container className="btn-container p-3">
          <Row>
            <Col md={6}>
              <Form>
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
                <Button
                  variant="primary"
                  type="submit"
                  className="mr-3"
                  onClick={this.handleLogin}
                >
                  SignIn
                </Button>
                <span className="align-bottom text-muted">
                  Not an existing user?{" "}
                  <Button
                    variant="link"
                    type="submit"
                    onClick={this.props.routeToRegister}
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
  }
}

export default LoginForm;

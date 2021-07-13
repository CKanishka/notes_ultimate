import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const LinkInput = ({ handleInputChange }) => (
  <Form.Group as={Row} controlId="link">
    <Form.Label column sm="2">
      Link
    </Form.Label>
    <Col sm="10">
      <Form.Control
        name="link"
        type="url"
        placeholder="Enter a URL"
        onChange={handleInputChange}
      />
    </Col>
  </Form.Group>
);

export default LinkInput;

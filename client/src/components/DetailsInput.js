import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const DetailsInput = ({ handleInputChange }) => (
  <Form.Group as={Row} controlId="details">
    <Form.Label column sm="2">
      Details
    </Form.Label>
    <Col sm="10">
      <Form.Control
        name="description"
        as="textarea"
        rows={3}
        placeholder="Brief description of note"
        onChange={handleInputChange}
      />
    </Col>
  </Form.Group>
);

export default DetailsInput;

import React, { Component } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import MapContainer from "./MapContainer";
import { DEFAULT_LOCATION, NOTE_TYPE } from "../Constants";
import DetailsInput from "./DetailsInput";
import LinkInput from "./LinkInput";
import ListInput from "./ListInput";
import ImageInput from "./ImageInput";

const defaultState = {
  title: "",
  description: "",
  link: "",
  listItems: [],
  file: null,
  fileObj: null,
  location: null,
};
class InputModal extends Component {
  state = defaultState;

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addListItem = (item) => {
    this.setState((state) => ({ listItems: [...state.listItems, item] }));
  };

  addImage = (e) => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      fileObj: e.target.files[0],
    });
  };

  markerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.setState({ location: { lat, lng } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const reset = () => {
      this.setState(() => defaultState);
      this.props.handleClose();
    };
    const { title, fileObj } = this.state;

    if (fileObj) {
      this.props.addImage({ title, fileObj });
      reset();
    } else {
      this.props.addItem(this.state);
      reset();
    }
  };

  render() {
    const { show, handleClose, option } = this.props;
    const formInput =
      option === NOTE_TYPE.Details ? (
        <DetailsInput handleInputChange={this.handleInputChange} />
      ) : option === NOTE_TYPE.List ? (
        <ListInput
          listItems={this.state.listItems}
          addListItem={this.addListItem}
        />
      ) : option === NOTE_TYPE.Img ? (
        <ImageInput
          addImage={this.addImage}
          file={this.state.file}
          fileObj={this.state.fileObj}
        />
      ) : option === NOTE_TYPE.Address ? (
        <MapContainer
          onMarkerDragEnd={this.markerDragEnd}
          location={DEFAULT_LOCATION}
          draggable={true}
        />
      ) : (
        <LinkInput handleInputChange={this.handleInputChange} />
      );
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="title">
              <Form.Label column sm="2">
                Title
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Give a title"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>
            {formInput}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={this.handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default InputModal;

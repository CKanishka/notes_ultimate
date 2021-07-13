import React from "react";
import {
  Button,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faImage,
  faList,
  faLink,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { NOTE_TYPE } from "../Constants";

const ButtonToolbar = ({ triggerModal }) => {
  const openModal = (option) => () => {
    triggerModal(option);
  };
  return (
    <Container className="box-container my-5">
      <Row>
        <Col>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id={`tooltip-bottom-1`}>Add Note</Tooltip>}
          >
            <Button
              variant="primary"
              className="m-2"
              onClick={openModal(NOTE_TYPE.Details)}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id={`tooltip-bottom-2`}>Add List</Tooltip>}
          >
            <Button
              variant="info"
              onClick={openModal(NOTE_TYPE.List)}
              className="m-2"
            >
              <FontAwesomeIcon icon={faList} />
            </Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id={`tooltip-bottom-3`}>Add Image</Tooltip>}
          >
            <Button
              variant="primary"
              className="m-2"
              onClick={openModal(NOTE_TYPE.Img)}
            >
              <FontAwesomeIcon icon={faImage} />
            </Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id={`tooltip-bottom-4`}>Add Link</Tooltip>}
          >
            <Button
              variant="info"
              className="m-2"
              onClick={openModal(NOTE_TYPE.Link)}
            >
              <FontAwesomeIcon icon={faLink} />
            </Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id={`tooltip-bottom-4`}>Add Location</Tooltip>}
          >
            <Button
              variant="primary"
              className="m-2"
              onClick={openModal(NOTE_TYPE.Address)}
            >
              <FontAwesomeIcon icon={faMapMarkedAlt} />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
};

export default ButtonToolbar;

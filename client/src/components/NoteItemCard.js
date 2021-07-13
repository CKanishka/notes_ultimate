import React from "react";
import { Card, Button } from "react-bootstrap";
import MapContainer from "./MapContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CheckboxItemList from "./CheckboxItemList";

const NoteItemCard = ({ item, toggleCheckbox, handleDelete, handleSave }) => {
  const {
    title,
    description,
    link,
    file,
    listItems,
    location,
    __unsavedChanges,
  } = item;

  return (
    <Card className="note-item-card" style={{ width: "18rem" }}>
      {file && (
        <>
          <Card.Img className="card-img" variant="top" src={file} />
        </>
      )}

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {description && <Card.Text>{description}</Card.Text>}
        {link && <a href={link}> {link} </a>}
        {listItems && (
          <CheckboxItemList listItems={listItems} onChecked={toggleCheckbox} />
        )}
        {location && (
          <MapContainer location={location} dragMarkerDisable={true} />
        )}
        <hr />
        <span className="d-table ml-auto">
          {__unsavedChanges && (
            <Button
              variant="outline-warning"
              size="sm"
              onClick={handleSave}
              className="mr-2"
            >
              Save Changes
            </Button>
          )}
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </span>
      </Card.Body>
    </Card>
  );
};

export default NoteItemCard;

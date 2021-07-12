import React from "react";
import { Card, Button } from "react-bootstrap";
import MapContainer from "./MapContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const NoteItemCard = ({ item, toggleCompletion, handleDelete }) => {
  const { title, description, link, file, listItems, location } = item;

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
          <ul>
            {listItems.map((item) => (
              <li
                key={item.id}
                onClick={() => toggleCompletion(item.id)}
                className={`custom-control custom-checkbox text-muted ${
                  item.checked ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  className="custom-control-input"
                />
                <label className="custom-control-label">{item.text}</label>
              </li>
            ))}
          </ul>
        )}
        {location && (
          <MapContainer location={location} dragMarkerDisable={true} />
        )}
        <hr />
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleDelete}
          className="d-table ml-auto"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NoteItemCard;

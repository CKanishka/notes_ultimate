import React, { useState } from "react";
import { Button, Form, InputGroup, Badge } from "react-bootstrap";
import CheckboxItemList from "./CheckboxItemList";
import uuid from "uuid/v4";

const ListInput = ({ listItems, addListItem }) => {
  const [currItem, setCurrItem] = useState({
    text: "",
    checked: false,
    id: uuid(),
  });

  const toggleCheckBox = () => {
    setCurrItem({ ...currItem, checked: !currItem.checked });
  };

  const handleTextChange = (e) => {
    setCurrItem({ ...currItem, text: e.target.value });
  };

  const addItem = () => {
    if (currItem.text && currItem.text.trim()) {
      addListItem(currItem);
      setCurrItem({ text: "", checked: false, id: uuid() });
    }
  };

  const checkboxDisabled = () => {
    return;
  };
  return (
    <>
      <Form.Group controlId="list">
        <Form.Label>List Items</Form.Label>
        {!listItems.length ? (
          <Badge pill variant="info" className="ml-3">
            No items in list
          </Badge>
        ) : (
          <CheckboxItemList
            listItems={listItems}
            onChecked={checkboxDisabled}
          />
        )}
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Checkbox
              checked={currItem.checked}
              onChange={toggleCheckBox}
            />
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            value={currItem.text}
            onChange={handleTextChange}
          />
          <Button
            variant="outline-info"
            size="sm"
            onClick={addItem}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            + Add to list
          </Button>
        </InputGroup>
      </Form.Group>
    </>
  );
};

export default ListInput;

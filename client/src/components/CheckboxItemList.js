import React from "react";

const CheckboxItemList = ({ listItems, onChecked }) => (
  <ul>
    {listItems.map((item) => (
      <li
        key={item.id}
        onClick={() => onChecked(item.id)}
        className={`custom-control custom-checkbox ${
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
);

export default CheckboxItemList;

import React, { useState } from "react";
import { Navbar, Form, FormControl } from "react-bootstrap";
import logo from "../assets/images/logo.png";

const Header = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#76b4e0" }}>
      <Navbar.Brand href="#">
        <img
          alt="Logo"
          src={logo}
          width="40"
          height="35"
          className="d-inline-block align-top"
        />{" "}
        <span className="font-weight-bold text-white">Notes Ultimate</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className="ml-auto">
          <FormControl
            type="search"
            placeholder="Search by note title"
            className="mr-sm-2"
            value={searchQuery}
            onChange={handleChange}
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

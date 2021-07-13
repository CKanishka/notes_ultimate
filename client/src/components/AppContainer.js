import React, { Component } from "react";
import Header from "./Header";
import ButtonToolbar from "./ButtonToolbar";
import ModalInput from "./InputModal";
import NoteItemCard from "./NoteItemCard";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";

class AppContainer extends Component {
  state = {
    showModal: false,
    items: [],
    filteredItems: [],
    option: "",
    searchQuery: "",
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(`/getitems/${this.props.currentUser}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({ items: res, loading: false }, this.filterItems)
      )
      .catch((err) => {
        alert("Failed to fetch items");
        this.setState({ loading: false });
      });
  }

  addItem = (item) => {
    //saving the new item to DB
    fetch("/additem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, userid: this.props.currentUser }),
    })
      .then((res) => res.json())
      .then((item) => this.updateItems(item));
  };

  saveItem = (item) => {
    const resetItemUnsavedState = () => {
      this.setState(
        (state) => ({
          items: state.items.map((x) =>
            x._id === item._id ? { ...x, __unsavedChanges: false } : x
          ),
        }),
        this.filterItems
      );
    };
    //saving the updated item to DB
    fetch(`/update/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          resetItemUnsavedState();
          alert("Changes saved");
        } else throw Error;
      })
      .catch((err) => alert("Failed to save changes"));
  };

  addImage = (item) => {
    const formData = new FormData();
    formData.append("cardImg", item.fileObj);
    formData.append("title", item.title);
    formData.append("userid", this.props.currentUser);
    formData.append("location", null);

    fetch("/uploadimage", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((item) => this.updateItems(item));
  };

  deleteItem = (id) => {
    fetch(`/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState(
            {
              items: this.state.items.filter((item) => item._id !== id),
            },
            this.filterItems
          );
        } else throw Error;
      })
      .catch((err) => alert("Failed to delete item"));
  };

  filterItems = () => {
    const { items, searchQuery } = this.state;
    const filteredItems = items.filter(
      (item) =>
        !searchQuery ||
        (searchQuery && !searchQuery.trim()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ filteredItems });
  };

  updateItems = (item) => {
    this.setState(
      (state) => ({
        items: [item, ...state.items],
      }),
      this.filterItems
    );
  };

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery }, this.filterItems);
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  triggerModal = (option) => {
    this.setState({ showModal: !this.state.showModal, option: option });
  };

  handleToggleCheckbox = (itemId, id) => {
    const updatedItems = this.state.items.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          listItems: item.listItems.map((x) =>
            x.id === id ? { ...x, checked: !x.checked } : x
          ),
          __unsavedChanges: true,
        };
      }
      return item;
    });
    this.setState({ items: updatedItems }, this.filterItems);
  };

  render() {
    return (
      <>
        <ModalInput
          show={this.state.showModal}
          handleClose={this.handleClose}
          option={this.state.option}
          addItem={this.addItem}
          addImage={this.addImage}
        />
        <Header handleSearch={this.handleSearch} />
        <ButtonToolbar triggerModal={this.triggerModal} />
        <Container className="flex-grow-1">
          {this.state.loading ? (
            <Spinner
              animation="border"
              variant="primary"
              className="d-table mx-auto"
            />
          ) : !this.state.filteredItems.length ? (
            <Alert variant="warning" className="d-table mx-auto">
              No items found.
            </Alert>
          ) : (
            <Row sm={2} md={3}>
              {this.state.filteredItems.map((item) => (
                <Col className="mb-1">
                  <NoteItemCard
                    key={item._id}
                    item={item}
                    toggleCheckbox={(id) =>
                      this.handleToggleCheckbox(item._id, id)
                    }
                    handleDelete={() => this.deleteItem(item._id)}
                    handleSave={() => this.saveItem(item)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </>
    );
  }
}

export default AppContainer;

import React, { Component } from "react";
import Header from "./Header";
import ButtonToolbar from "./ButtonToolbar";
import ModalInput from "./InputModal";
import NoteItemCard from "./NoteItemCard";
import { Container, Row, CardColumns, Alert, Spinner } from "react-bootstrap";

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
    fetch(`http://localhost:5000/getitems/${this.props.currentUser}`, {
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
    fetch("http://localhost:5000/additem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, userid: this.props.currentUser }),
    })
      .then((res) => res.json())
      .then((item) => this.updateItems(item));
  };

  addImage = (item) => {
    const formData = new FormData();
    formData.append("cardImg", item.fileObj);
    formData.append("title", item.title);
    formData.append("userid", this.props.currentUser);
    formData.append("location", null);

    fetch("http://localhost:5000/uploadimage", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((item) => this.updateItems(item));
  };

  deleteItem = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
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
        }
      });
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

  toggleCompletion = (id) => {
    const updatedCards = this.state.items.map((item) => {
      const updatedListItems = item.listItems.map((li) => {
        if (li.id === id) {
          return { ...li, checked: !li.checked };
        }
        return li;
      });
      return { ...item, listItems: updatedListItems };
    });
    this.setState({ items: updatedCards });
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
            <Row>
              <CardColumns>
                {this.state.filteredItems.map((item) => (
                  <NoteItemCard
                    key={item._id}
                    item={item}
                    toggleCompletion={this.toggleCompletion}
                    handleDelete={() => this.deleteItem(item._id)}
                  />
                ))}
              </CardColumns>
            </Row>
          )}
        </Container>
      </>
    );
  }
}

export default AppContainer;

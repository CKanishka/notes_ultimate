import React, { Component } from "react";
import Header from "./Header";
import ButtonToolbar from "./ButtonToolbar";
import ModalInput from "./InputModal";
import NoteItemCard from "./NoteItemCard";
import { Container, Row, CardColumns } from "react-bootstrap";

class AppContainer extends Component {
  state = {
    showModal: false,
    cardItems: [],
    filteredItems: [],
    option: "",
    searchQuery: "",
  };
  componentDidMount() {
    fetch(`http://localhost:5000/getitems/${this.props.currentUser}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => this.setState({ cardItems: res }));
  }
  addItem = (item) => {
    //saving the new item to DB
    fetch("http://localhost:5000/additem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, userid: this.props.currentUser }),
    })
      .then((res) => res.json())
      .then((item) =>
        this.setState({ cardItems: [item, ...this.state.cardItems] }, () =>
          console.log(this.state.cardItems)
        )
      );
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
      .then((item) =>
        this.setState({ cardItems: [item, ...this.state.cardItems] })
      );
  };
  handleSearch = (searchQuery) => {
    console.log(searchQuery);
    const filteredItems = this.state.cardItems.filter(
      (item) =>
        !searchQuery ||
        (searchQuery && !searchQuery.trim()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ filteredItems, searchQuery });
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };

  triggerModal = (option) => {
    this.setState({ showModal: !this.state.showModal, option: option });
  };
  toggleCompletion = (id) => {
    const updatedCards = this.state.cardItems.map((item) => {
      const updatedListItems = item.listItems.map((li) => {
        if (li.id === id) {
          return { ...li, checked: !li.checked };
        }
        return li;
      });
      return { ...item, listItems: updatedListItems };
    });
    this.setState({ cardItems: updatedCards });
  };
  deleteItem = (id) => {
    const updatedCards = this.state.cardItems.filter((item) => item._id !== id);
    this.setState({ cardItems: updatedCards });
  };
  handleDelete = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.deleteItem(id);
        }
      });
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
          <Row>
            <CardColumns>
              {this.state.searchQuery.length > 0
                ? this.state.filteredItems.map((item) => (
                    <NoteItemCard
                      key={item._id}
                      item={item}
                      toggleCompletion={this.toggleCompletion}
                      handleDelete={() => this.handleDelete(item._id)}
                    />
                  ))
                : this.state.cardItems.map((item) => (
                    <NoteItemCard
                      key={item._id}
                      item={item}
                      toggleCompletion={this.toggleCompletion}
                      handleDelete={() => this.handleDelete(item._id)}
                    />
                  ))}
            </CardColumns>
          </Row>
        </Container>
      </>
    );
  }
}

export default AppContainer;

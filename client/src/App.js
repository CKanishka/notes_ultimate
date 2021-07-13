import React from "react";
import "./App.css";
import AppContainer from "./components/AppContainer";
import LoginForm from "./components/Login";
import RegisterForm from "./components/Register";
import Footer from "./components/Footer";
class App extends React.Component {
  state = {
    route: "signin",
    currentUser: "",
  };
  handleSignIn = (form) => {
    fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.error) this.setState({ route: "home", currentUser: res.user });
        else alert("Please check your credentials or register");
      })
      .catch((err) => {
        alert("Error logging in");
      });
  };
  handleRegister = (form) => {
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.error) {
          this.setState({ route: "home", currentUser: res.user });
          alert("Registered Successfully");
        } else alert("Failed to register, please try again.");
      })
      .catch((err) => {
        alert("Error registering");
      });
  };
  routeToRegister = () => {
    this.setState({ route: "register" });
  };
  routeToLogin = () => {
    this.setState({ route: "signin" });
  };

  render() {
    return (
      <div className="App">
        {this.state.route === "home" ? (
          <AppContainer currentUser={this.state.currentUser} />
        ) : this.state.route === "signin" ? (
          <LoginForm
            handleSignIn={this.handleSignIn}
            routeToRegister={this.routeToRegister}
          />
        ) : (
          <RegisterForm
            handleRegister={this.handleRegister}
            routeToLogin={this.routeToLogin}
          />
        )}
        <Footer />
      </div>
    );
  }
}

export default App;

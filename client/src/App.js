import React from "react";
import "./App.css";
import AppContainer from "./components/AppContainer";
import LoginForm from "./components/Login";
import RegisterForm from "./components/Register";
import Footer from "./components/Footer";
class App extends React.Component {
  state = {
    route: "signin",
    users: [{ email: "test@mail.com", password: "test123" }],
    currentUser: "",
  };
  handleSignIn = (form) => {
    fetch("http://localhost:5000/authenticate", {
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

  routeToRegister = () => {
    this.setState({ route: "register" });
  };
  routeToLogin = () => {
    this.setState({ route: "signin" });
  };
  handleRegister = (form) => {
    // this.setState({users:[...this.state.users,{email,password}]},this.routeToLogin)
    // alert("Registered Successfully. You can signin now.")
    fetch(" http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.error) {
          this.setState({ route: "home", currentUser: res.user });
          alert("Registered Successfully");
        } else alert("Please check your credentials or register");
      })
      .catch((err) => {
        alert("Error registering");
      });
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

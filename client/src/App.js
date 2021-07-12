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
  handleSignIn = (email, password) => {
    // const exists = this.state.users.map((user) => {
    //     if(user.email === email && user.password === password){
    //         return true
    //     }
    //     return false
    // })

    // if(exists.some((item)=> item === true)){
    //     this.setState({route:"home"})
    // }

    // else{
    //     alert("Please check your credentials or register")
    // }

    fetch("http://localhost:5000/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
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
  handleRegister = (email, password) => {
    // this.setState({users:[...this.state.users,{email,password}]},this.routeToLogin)
    // alert("Registered Successfully. You can signin now.")
    fetch(" http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Registered Successfully. You can signin now.");
          this.setState({ route: "signin" });
        } else
          alert("Error registering please try again with different email-id");
      })
      .catch((err) => {
        alert("Error logging in");
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.route === "home" ? (
          <AppContainer1 currentUser={this.state.currentUser} />
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

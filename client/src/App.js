import React from 'react';
import './App.css';
import AppContainer from './components/AppContainer';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
class App extends React.Component {
    state={
        route:"signin",
        users:[{email:"test@mail.com",password:"test123"}]
    }
    handleSignIn = (email,password) => {
        console.log("handleSignInProp")
        const exists = this.state.users.map((user) => {
            if(user.email === email && user.password === password){
                return true
            }
            return false
        })

        if(exists.some((item)=> item === true)){
            this.setState({route:"home"})
        }

        else{
            alert("Please check your credentials or register")
        }
    }

    routeToRegister = () => {
        this.setState({route:"register"})
    }
    routeToLogin = () => {
        this.setState({route:"signin"})
    }
    handleRegister = (email,password) => {
        this.setState({users:[...this.state.users,{email,password}]},this.routeToLogin)
    }
    render(){

        return (
            <div className="App">
                {this.state.route === "home"? <AppContainer /> : this.state.route==="signin"?<LoginForm handleSignIn={this.handleSignIn} routeToRegister={this.routeToRegister}/> : <RegisterForm handleRegister={this.handleRegister}/>}
            </div>
          );
    }
  
}

export default App;

import React, {Component} from 'react';
import {Container,Form,Button,Col} from 'react-bootstrap';

class LoginForm extends Component {

    state={
        email:"",
        password:""
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleLogin = (e) => {
        e.preventDefault()
        console.log('handleSignInmethod')
        this.props.handleSignIn(this.state.email,this.state.password)
    }
    render(){

        return(
            
            <Col lg="6" className="mx-auto mt-5">
            <Container className="btn-container">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label >Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email-id" onChange={this.handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mr-3"  onClick={this.handleLogin}>
                        SignIn
                    </Button>
                    <Button variant="info" type="submit" onClick={this.props.routeToRegister}>
                        Register
                    </Button>
                </Form>
            </Container>
            </Col>
        )
    }
}

export default LoginForm;
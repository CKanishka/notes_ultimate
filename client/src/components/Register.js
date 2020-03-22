import React, {Component} from 'react';
import {Container,Form,Button,Col} from 'react-bootstrap';

class RegisterForm extends Component {

    state={
        name:"",
        email:"",
        password:""
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleRegister = (e) => {
        e.preventDefault()
        this.props.handleRegister(this.state.email,this.state.password)
    }
    render(){

        return(
            
            <Col lg="6" className="mx-auto mt-5">
            <Container className="btn-container">
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label >Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Enter your name" onChange={this.handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label >Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email-id" onChange={this.handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleRegister}>
                        Register
                    </Button>
                </Form>
            </Container>
            </Col>
        )
    }
}

export default RegisterForm;
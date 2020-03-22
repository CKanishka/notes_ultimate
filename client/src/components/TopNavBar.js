import React,{Component} from 'react';
import {Navbar,Form,FormControl,Button} from 'react-bootstrap';
class TopNavBar extends Component{
    render(){
        return(
            <Navbar expand="lg" style={{"backgroundColor": "#76b4e0"}}>
                <Navbar.Brand href="#">Notes</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopNavBar
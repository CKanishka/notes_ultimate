import React,{Component} from 'react';
import {Navbar,Form,FormControl,Button} from 'react-bootstrap';
import logo from '../assets/noteslogo2.gif'
class TopNavBar extends Component{
    state = {
        searchquery:""
    }

    handleChange = (e) => {
        this.setState({searchquery:e.target.value},this.handleSearch)
       
    }

    handleSearch = () => {
        // e.preventDefault();
        this.props.handleSearch(this.state.searchquery);
    }
    render(){
        return(
            <Navbar expand="lg" style={{"backgroundColor": "#76b4e0"}}>
                <Navbar.Brand href="#">
                        <img
                        alt=""
                        src={logo}
                        width="40"
                        height="35"
                        className="d-inline-block align-top"
                    />{' '}
                    My Notes
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleChange}/>
                    <Button variant="outline-primary" onClick={this.handleSearch}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopNavBar
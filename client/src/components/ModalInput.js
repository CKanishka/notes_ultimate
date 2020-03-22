import React,{Component} from 'react';    
import { Modal,Button ,Form,Col,Row,InputGroup,FormControl} from 'react-bootstrap';   
import MapContainer from './MapContainer';
import uuid from "uuid/v4";

const defaultState = {
    listItems:[],
    currentItem:{itemText:"",checked:false},
    file:null,
    title:'',
    description:'',
    link:'',
    defaultLocation:{
        lat: 22.0127399,
        lng: 79.4523598
    },
    location:null
}
class ModalInput extends Component{
    state = defaultState
    
    addImage = (e) => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
          })
    }
    /********Handlers for the list ********/
    handleChange = (e) => {
        this.setState({currentItem:{...this.state.currentItem,itemText:e.target.value}})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {currentItem,listItems} = this.state
        if(currentItem.itemText.length>0){
        this.setState({listItems:[{text:currentItem.itemText,checked:currentItem.checked,id: uuid()},...listItems],currentItem:{itemText:"",checked:false}})
        }
    }
    /*************************************/
    handleCardSubmit = (e) => {
        e.preventDefault()
        const {title,description,link,file,listItems,location} = this.state
        this.props.addCardItems({title,description,link,file,listItems,location})
        this.setState(()=>defaultState)
    }
    toggleCheckBox = (e) => {
        this.setState({currentItem:{...this.state.currentItem,checked:!this.state.currentItem.checked}})
    }
    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }
    markerDragEnd = (coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.setState({location:{lat,lng}},()=>console.log(this.state))
    }

    detailsInput = () => {
        const detailsInputBox = 
                    this.props.option==="link"? 
                    <Form.Group as={Row} controlId="link">
                    <Form.Label column sm="2">
                    Link
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control name="link" type="text" placeholder="Enter a URL" onChange={this.handleInputChange}/>
                    </Col>
                </Form.Group>:<Form.Group as={Row} controlId="details">
                        <Form.Label column sm="2">
                        Details
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control name="description" type="url" placeholder="Brief description"  onChange={this.handleInputChange}/>
                        </Col>
                    </Form.Group>
          
              
        return detailsInputBox            
    }

    listInput = () => {
        const listInputBox = 
        // <form onSubmit={this.handleSubmit}>
        <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={this.state.currentItem.checked} onChange={this.toggleCheckBox} />
        </InputGroup.Prepend>
            <FormControl aria-label="Text input with checkbox" value={this.state.currentItem.itemText} onChange={this.handleChange}/>
            <Button variant="warning" type="submit" onClick={this.handleSubmit}>+</Button>
        </InputGroup>  
        
        // </form>
        return listInputBox
    }

    renderListItems = (item,index) => {
        const renderListItem = 
            <InputGroup className="mb-3" key={index}>
            <InputGroup.Prepend>
            <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={item.checked} onChange={()=>console.log("checkbox clicked")}/>
            </InputGroup.Prepend>
                <FormControl aria-label="Text input with checkbox" value={item.text}/>
            </InputGroup>  
     
        return renderListItem
    }
    renderListContainer = () => {
        return(
            <>
        {this.state.listItems.map((item,index)=>this.renderListItems(item,index))}
        {this.listInput()}
        </>
        )
    }
    renderImageUpload = () => {
        return (
        <>
        <input type="file" className="fileUploadBtn" onChange={this.addImage}/> <br/>
        {this.state.file && <img src={this.state.file} alt="img1" height="200" width="300"/>}
        </>
        )
    }

    renderMapInput = () => {
        return (
            
            <MapContainer onMarkerDragEnd={this.markerDragEnd} location={this.state.defaultLocation} draggable={true} />
            
        )
    }
    render(){
        const {show,handleClose,option} = this.props
        const formInput = (option==="notes"?this.detailsInput():(option==="list"?this.renderListContainer():(option==="image"?this.renderImageUpload():(option==="map"?this.renderMapInput():this.detailsInput()))))
        return(
            <Modal show={show} onHide={handleClose} >
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="title">
                        <Form.Label column sm="2">
                        Title
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control name="title" type="text" placeholder="Give a title"  onChange={this.handleInputChange} />
                        </Col>
                    </Form.Group>
                    {formInput}
                    <Modal.Footer>
                        <Button type="submit" variant="primary" onClick={this.handleCardSubmit}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
            
            </Modal>
        )
    }
}  

export default ModalInput;
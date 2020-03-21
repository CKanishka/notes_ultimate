import React,{Component} from 'react';
import {Button,OverlayTrigger,Tooltip,Container,Row,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusSquare,faImage,faList,faLink,faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
class ButtonContainer extends Component{
    openModal = (option) => () => {
        this.props.triggerModal(option)
    }
    render(){
        return(
            <div className="text-center" style={{margin:"30px"}}>
                <Container className="btn-container" >
                <Row > 
                    <Col>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                        <Tooltip id={`tooltip-bottom-1`}>
                            Add Note
                        </Tooltip>
                        }>
                        <Button variant="primary" className="m-2" onClick={this.openModal('notes')}><FontAwesomeIcon icon={faPlusSquare} />
                        </Button>
                    </OverlayTrigger>
                    </Col>
                    <Col >
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                        <Tooltip id={`tooltip-bottom-2`}>
                            Add List
                        </Tooltip>
                        }
                    >
                        <Button variant="info"  onClick={this.openModal('list')}className="m-2"><FontAwesomeIcon icon={faList} /></Button>
                    </OverlayTrigger>
                    </Col>
                    <Col >
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                        <Tooltip id={`tooltip-bottom-3`}>
                            Add Image
                        </Tooltip>
                        }
                    >
                        <Button variant="primary" className="m-2"  onClick={this.openModal('image')}><FontAwesomeIcon icon={faImage} /></Button>
                    </OverlayTrigger>
                    </Col>
                    <Col >
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                        <Tooltip id={`tooltip-bottom-4`}>
                            Add Link
                        </Tooltip>
                        }
                    >
                        <Button variant="info" className="m-2"  onClick={this.openModal('link')}><FontAwesomeIcon icon={faLink} /></Button>
                    </OverlayTrigger>
                    </Col>
                    <Col >
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                        <Tooltip id={`tooltip-bottom-4`}>
                            Add Location
                        </Tooltip>
                        }
                    >
                        <Button variant="primary" className="m-2"  onClick={this.openModal('map')}><FontAwesomeIcon icon={faMapMarkedAlt} /></Button>
                    </OverlayTrigger>
                    </Col>
                </Row>
                </Container>
                
            </div>
        )
    }
}

export default ButtonContainer
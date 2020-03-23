import React from 'react';
import {Card,Button} from 'react-bootstrap';
import MapContainer from './MapContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
const toggleCompletion = (props,id) => {
    props.toggleCompletion(id)
}
const CardComponent = (props) => {
    const {title,description,link,file,listItems,location} = props.item
    return (
        <Card className="cardcomp" style={{ width: '18rem' }}>
            <Card.Img className="cardimg" variant="top" src={file} />
            <hr />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                {description}
                </Card.Text>
                <a href={link}> {link} </a>
                <ul>
                {listItems.map((item)=><li key={item.id} onClick={()=>toggleCompletion(props,item.id)} className={item.checked?"listLineThrough":""}><input type="checkbox" defaultValue={item.checked}/><span className="pl-3">{item.text}</span></li>)}
                </ul>
                {(location!==null) && <MapContainer location={location} dragMarkerDisable={true}/> }
                <hr />
                <Button variant="outline-primary" onClick={props.handleDelete} className="m-2"><FontAwesomeIcon icon={faTrash} /></Button>
            </Card.Body>
        </Card>
    )
}

export default CardComponent;
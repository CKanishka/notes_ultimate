import React from 'react';
import {Card} from 'react-bootstrap';
import MapContainer from './MapContainer';
const CardComponent = (props) => {
    const {title,description,link,file,listItems,location} = props.item
    console.log(listItems)
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
                {listItems.map((item)=><li>{item.text}</li>)}
                </ul>
                {(location.lat!==22.0127399 || location.lng!==79.4523598) && <MapContainer location={location} dragMarkerDisable={true}/> }
            </Card.Body>
        </Card>
    )
}

export default CardComponent;
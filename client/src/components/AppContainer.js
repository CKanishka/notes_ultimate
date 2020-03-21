import React,{Component} from 'react';
import TopNavBar from './TopNavBar';
import ButtonContainer from './ButtonContainer';
import ModalInput from './ModalInput';
import Card from './CardComponent';
import {CardDeck,Container,Row,CardColumns} from 'react-bootstrap';
import MapContainer from './MapContainer';
class AppContainer extends Component{

    state={
        showModal:false,
        cardItems:[],
        option:''
    }

    addCardItems = (item) => {
        this.setState({cardItems:[item,...this.state.cardItems]})
    }

    handleClose = () => {
        this.setState({showModal:false})
    }

    triggerModal = (option) => {
        this.setState({showModal:!this.state.showModal,option:option})
    }
    toggleCompletion = (id) => {
        const updatedCards = this.state.cardItems.map((item) => {
        
        const updatedListItems = item.listItems.map((li)=>{
           if(li.id === id){
               return {...li,checked:true}
           } 
           return li
        })
        return {...item,listItems:updatedListItems}
        })
        this.setState({cardItems:updatedCards})
    }
    render(){
        
        return(
            <>
            <ModalInput show={this.state.showModal} handleClose={this.handleClose} option={this.state.option} addCardItems={this.addCardItems}/>
            <TopNavBar />
            <ButtonContainer triggerModal={this.triggerModal}/>
            <Container>
                <Row > 
                    <CardColumns>
                        {this.state.cardItems.map((item)=><Card item={item} toggleCompletion={this.toggleCompletion}/>)}
                    </CardColumns>
                </Row>
            </Container>    
            </>
        )
    }
}

export default AppContainer
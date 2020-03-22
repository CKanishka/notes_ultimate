import React,{Component} from 'react';
import TopNavBar from './TopNavBar';
import ButtonContainer from './ButtonContainer';
import ModalInput from './ModalInput';
import Card from './CardComponent';
import {Container,Row,CardColumns} from 'react-bootstrap';

class AppContainer extends Component{

    state={
        showModal:false,
        cardItems:[],
        filteredItems:[],
        option:'',
        searchQuery:''
    }

    addCardItems = (item) => {
        this.setState({cardItems:[item,...this.state.cardItems]})
    }
    handleSearch = (searchQuery) => {
        console.log(searchQuery)
        const filteredItems = this.state.cardItems.filter((item)=>{
            return item.title.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
        });
        this.setState({filteredItems,searchQuery})
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
               return {...li,checked:!li.checked}
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
            <TopNavBar handleSearch={this.handleSearch}/>
            <ButtonContainer triggerModal={this.triggerModal}/>
            <Container>
                <Row > 
                    <CardColumns>
                        {
                        (this.state.searchQuery.length>0)?(this.state.filteredItems.map((item)=><Card item={item} toggleCompletion={this.toggleCompletion}/>))
                        :(this.state.cardItems.map((item)=><Card item={item} toggleCompletion={this.toggleCompletion}/>))
                        }
                    </CardColumns>
                </Row>
            </Container>    
            </>
        )
    }
}

export default AppContainer
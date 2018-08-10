import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import SearchBar from './SearchBar';
import MarkersList from './MarkersList';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class MarkersPanel extends Component {
    constructor(props){
        super(props);
    }
    state={
        value: '',
        places : []
    }


handleChange = (event, props)=>{
        this.setState({value: event.target.value.substr(0,20)})
}
onClearInput = () =>{
    this.setState({value: ''})
}  
showInfowindow = (element)=> {
    console.log(this.state.markers)
    //const marker = this.state.markers.find(el => el.id === element);        
    //new window.google.maps.event.trigger(marker, 'click');  
}

    render(){
        
        let foundedPlaces
        if(this.state.value){
            const match = new RegExp(escapeRegExp(this.state.value, 'i'))
            foundedPlaces = this.props.listOfMarkers.filter((place)=>match.test(place.name))

        } else {
            foundedPlaces = this.props.listOfMarkers
        }
        foundedPlaces.sort(sortBy('name'))
        
        return(
            <div>
                
                <Alert color="secondary">
                
                    <SearchBar 
                    value={this.state.value}
                    onHandleChange={this.handleChange.bind(this)}
                    onClearInput={this.onClearInput}
                    
                    />
                    <MarkersList
                    showInfowindow = {this.showInfowindow(event.target)}
                    {...[foundedPlaces]}
                    />
                </Alert>
            </div>
        )
    }
}
export default MarkersPanel;
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
    initialState = () => ({
        value: '',
        foundedPlaces: this.props.listOfMarkers,
        places : []
    })
    state = this.initialState()


    handleChange = (event, props)=>{
            const match = new RegExp(escapeRegExp(this.state.value, 'i'));
            const foundedPlaces = this.state.foundedPlaces.filter((place)=>match.test(place.name));
            this.setState({
                value: event.target.value.substr(0,20),
                foundedPlaces: foundedPlaces.sort(sortBy('name'))
            })
    }
    onClearInput = () =>{
        this.setState(this.initialState())
    }  


    render(){   
         
    const {foundedPlaces} = this.state;

        return(
          
            <div>
                <Alert color="secondary">
                
                    <SearchBar 
                    value={this.state.value}
                    onHandleChange={this.handleChange.bind(this)}
                    onClearInput={this.onClearInput}
                    />
                    <MarkersList
                    sendArray={foundedPlaces}
                    showWindow = {this.props.openInfoWindow}
                    {...[foundedPlaces]}
                    />
                </Alert>
            </div>
        )
    }
}
export default MarkersPanel;
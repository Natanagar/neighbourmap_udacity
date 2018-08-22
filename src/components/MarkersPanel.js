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
        foundedPlaces: this.props.listOfMarkers
    })
    state = this.initialState()
    


    handleChange = (event, props)=>{
            
                const match = new RegExp(escapeRegExp(this.state.value, 'i'));
                const foundedPlaces = this.state.foundedPlaces.filter((place)=>match.test(place.name));
                console.log(foundedPlaces)
                this.setState({})
                this.setState({
                        value : event.target.value.substr(0,20),
                        foundedPlaces: foundedPlaces.sort(sortBy('name'))
                    })
                console.log(this.state.foundedPlaces)
        this.props.getPlaces(this.state.foundedPlaces);
    }
    onClearInput = () =>{
        this.setState(this.initialState())
    }  


    render(){  
    
    const {foundedPlaces, value} = this.state;
    
        return(
          
            <div>
                <Alert color="secondary">
                
                    <SearchBar 
                    value={this.state.value}
                    sendValue={this.props.getValueFromMarkerPanel(value)}
                    onHandleChange={this.handleChange.bind(this)}
                    onClearInput={this.onClearInput}
                    aria-label="Filter markers form"
                    role="search"
                    label="Filter markers"
                    />
                    <MarkersList
                    role='menu'
                    className="marker-list"
                    tabIndex="0"
                    sendArray={foundedPlaces}
                    sortedMarkers = {this.props.sortingMarkers}
                    {...[foundedPlaces]}
                    />
                </Alert>
            </div>
        )
    }
}
export default MarkersPanel;
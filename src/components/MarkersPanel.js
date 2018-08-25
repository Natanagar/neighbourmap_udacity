import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import SearchBar from './SearchBar';
import MarkersList from './MarkersList';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class MarkersPanel extends Component {
    constructor(props){
        super(props); 
    this.handleChange = this.handleChange.bind(this); 
}
    state = {
        value : ''
    }

    handleChange = (event, props)=>{
       this.setState({
            value : event.target.value.substr(0,20)
       }) 
       this.props.handleChangePlacesAndMarkers();       
    }


    render(){  
    //console.log(this.props.handleChangePlacesAndMarkers)
    
    const {foundedPlaces, value} = this.state;
    let { clickInfoWindow, places } = this.props;

        return(
          
            <div>
                <Alert color="secondary">
                
                    <SearchBar 
                    value={this.state.value}
                    sendValue={this.props.getValueFromMarkerPanel(value)}//
                    onHandleChange={this.handleChange}
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
                    clickInfoWindow={this.props.clickInfoWindow}
                    changePlaces={this.props.handleChangePlacesAndMarkers}   
                    places={places}
                    //{...[foundedPlaces]}
                    
                    />
                </Alert>
            </div>
        )
    }
}
export default MarkersPanel;
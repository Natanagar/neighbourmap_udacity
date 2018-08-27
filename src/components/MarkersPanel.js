import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import SearchBar from './SearchBar';
import MarkersList from './MarkersList';



const MarkersPanel = (props) =>  {

    let { clickInfoWindow, sortPlaces, value } = props;
return(
    <div>
                <Alert color="secondary">
                
                    <SearchBar 
                    value={value}
                    //sendValue={this.props.getValueFromMarkerPanel(value)}//
                    onHandleChange={props.handleChange}
                    aria-label="Filter markers form"
                    role="search"
                    label="Filter markers"
                    />
                    <MarkersList
                    role='menu'
                    className="marker-list"
                    tabIndex="0"
                    clickInfoWindow={props.clickInfoWindow}
                    changePlaces={props.handleChangePlacesAndMarkers}   
                    sortPlaces={sortPlaces}
                    
                    />
                </Alert>
            </div>
    )
}

export default MarkersPanel;
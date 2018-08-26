import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import SearchBar from './SearchBar';
import MarkersList from './MarkersList';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


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
                    //sendArray={foundPlaces}
                    sortedMarkers = {props.sortingMarkers}
                    clickInfoWindow={props.clickInfoWindow}
                    changePlaces={props.handleChangePlacesAndMarkers}   
                    places={sortPlaces}
                    
                    />
                </Alert>
            </div>
    )
}

export default MarkersPanel;
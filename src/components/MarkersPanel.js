import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import SearchBar from './SearchBar';
import MarkersList from './MarkersList';
const MarkersPanel = (props) =>{
    console.log(props);
    return(
        <div>
            <Alert color="secondary">
                <SearchBar 
                query={props.query}
                onUpdate={props}
                />
                <MarkersList 
                showMarkers={props}
                />
            </Alert>
        </div>
    )
}

export default MarkersPanel;
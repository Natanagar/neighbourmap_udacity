import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import SearchBar from './SearchBar';
import MarkersList from './MarkersList';
const MarkersPanel = (props) =>{
    return(
        <div>
            <Alert color="secondary">
                <SearchBar />
                <MarkersList />
            </Alert>
        </div>
    )
}

export default MarkersPanel;
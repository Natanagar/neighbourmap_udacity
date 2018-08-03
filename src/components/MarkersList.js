import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
//import Marker from './components/Marker'

const MarkersList = (props) =>{
    return(
        <div>
            <Alert color="light">
                <ol>
                   {/* {props.markers.map((marker) => {
                        return (
                        <li key={marker.id}>
                            <Marker
                            marker={marker}
                            />
                        </li>
                        );
                    })}*/}
                </ol>
            <br/>
            </Alert>            
        </div>
    )
}


export default MarkersList;
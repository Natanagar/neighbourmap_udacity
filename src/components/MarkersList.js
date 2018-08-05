import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import Places from './map/places';
import PropTypes from 'prop-types';

const MarkersList = (props) =>{
   //console.log(Places);
    return(
        <div>
            <Alert color="light">
                <ol>
                    {Places.map((place) => {
                        console.log(place.name)
                        return (
                        <li key={place.id}>
                            <div>{place.name}</div>
                        </li>
                        );
                    })}
                </ol>
            <br/>
            </Alert>            
        </div>
    )
}
export default MarkersList;
Alert.propTypes = {
    className: PropTypes.string,
    closeClassName: PropTypes.string,
    color: PropTypes.string, // default: 'success'
    isOpen: PropTypes.bool,  // default: true
    toggle: PropTypes.func,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // Controls the transition of the alert fading in and out
  }
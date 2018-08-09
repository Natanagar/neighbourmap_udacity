import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import Places from './map/places';
import PropTypes from 'prop-types';




class MarkersList extends Component {
   constructor(props){
    
       super(props);
   }
   
   render(){
   console.log(this.props[0])
   let places = this.props[0] 
    return(
      
        <div>
            <Alert color="light">
                <ol>
                    {places.map((place) => {
            
                        return (
                        <li key={place.id}>
                            <div className="markerList"
                                onUpdate={this.update}
                            style ={{
                                borderStyle: "ridge",
                                fontStyle: 'Bold',
                                paddingLeft : "5px",
                                fontSize: "13px"
                                
                            }} >{place.name}
                            <div>{place.englishName}</div>
                            
                            </div>
                        </li>
                        );
                    })}
                </ol>
            <br/>
            </Alert>            
        </div>
    )
   }
    
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
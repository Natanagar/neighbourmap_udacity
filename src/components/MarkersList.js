import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';




const MarkersList = (props) =>{   
  const { places } = props;
   

   
    return(
      
        <div>
            <Alert color="light">
                <ol>
                    {places.map((place) => {
            
                        return (
                        <li id={place.id} 
                            key={place.id}
                            onClick={(event) => props.sortedMarkers(event)}
                            onMouseUp={(event) => props.clickInfoWindow(event)}
                            onMouseMove={(event) => props.changePlaces(event)}
                            >
                            <div className="markerList"
                                role={'menuitem'}
                                tabIndex={'0'}
                                
                                
                               
                                
                            style ={{
                                borderStyle: "ridge",
                                fontStyle: 'Bold',
                                paddingLeft : "5px",
                                fontSize: "13px"
                                
                            }} >{place.englishName}
                        
                            <div
            
                            >{place.name}</div>
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
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Map.css'
 /* global google */


class Map extends Component {
    constructor(props){
        super(props);
    //state = {
        //no state
    //    }
    //createRef()
    this.myMapContainer = React.createRef()
    }

    componentDidMount(){
        let map = new google.maps.Map(this.myMapContainer.current, {
            center: {
                lat: 50.866077, 
                lng: 20.628568
            },
            scrollwheel : false,
            zoom : 14

        })
    }

    render(){
        return(
            <div ref={this.myMapContainer} id="map" />
        )
    }
}
export default Map;

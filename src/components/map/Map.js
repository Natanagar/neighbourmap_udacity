import React, { Component } from 'react';
import './Map.css';
import Places from './places';
/* global google */
/*import { url } from 'inspector';*/


class Map extends Component {
    constructor(props){
        super(props);
    
    this.myMapContainer = React.createRef()
    }
    state = {
      markers : []
    }
   
    componentDidMount(){
      const markers = [];
    console.log(this.props)  
      //console.log(Places);
    //console.log (markers);

        var styledMapType = new google.maps.StyledMapType(this.props.styleMap, {'name' : 'Styled Map'});
      
        let map = new google.maps.Map(this.myMapContainer.current, this.props.optionMap)
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
        
      //type of icons in markers  
    var defaultIcon = makeMarkerIcon('558000');
    var highlightedIcon = makeMarkerIcon('FFFF24');
        
    //create list of markers
   Places.map((place)=>{
    let title = place.name,
        image = place.img;
        
     //console.log(place.location.lat)
     //console.log(place.location.lng)
     //console.log(title)
     var infowindow = new google.maps.InfoWindow({
          content : `<div className="container" style ={{height : '125px'}}>
                      <h3>${title}</h3>
                        <span>${place.site}</span>
                        <span>tel. ${place.phone}</span>
                        <div><img src=${image} height = "100" width="300" alt=${title}></img></div>
                      </div>`
        });
        let position = {lat: place.location.lat, lng: place.location.lng};
        
      
        var marker = new google.maps.Marker({
          map: map,
          position: position,
          title : title,
          animation: google.maps.Animation.DROP,
          icon: defaultIcon,
          id: 1
        });
      markers.push(marker);
      //open infowindow
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      google.maps.event.addListener(infowindow,'closeclick',function(){
        marker.setAnimation(google.maps.Animation.BOUNCE);
      });
      marker.addListener('click', function () {
        marker.setAnimation(null);
      });
    this.setState({markers : markers});
    

   })
//console.log(markers)

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21,34));
    return markerImage;
    }
    
}


    render(){
      //console.log(this.state.markers)
        return(
            <div ref={this.myMapContainer} 
            id="map" 
            onClick={this.showMarkers}
            
            />
        )
    }
}
export default Map;
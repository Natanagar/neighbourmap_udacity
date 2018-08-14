import React, { Component } from 'react';
import './Map.css';
import Places from './places';
import axios from 'axios';
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

  //Set timeout to check if the Map is loaded
  checkTheMapIsLoaded = (timer) => {
    this.refs.mapContainer.innerHTML = '<div class="message">Trying to load GoogleMap, please wait...</div>';
    let timeout = timer || 5000;

    window.gm_authFailure = (error)=> {
      console.log(`error ${error}`)
      alert(`Couldn't load the Google Map. Check your internet connection`);
    } 
  }
  getMarkers1 = (markers)=>{
     this.props.openInfoWindow(this.state.markers)
  }
  fetchDataFromFlickr = ()=> {
    let flickrProperties = {
      api_key : `51bcd20ecdbb552106279fb88e806ee8`,
      format : `json`,
      method : `flickr.photos.search`,
      lat : this.lat,
      lon : this.lng,
      radius : 5,

    };
    console.log(flickrProperties.lat);
    console.log(flickrProperties.lon);
    const url = `https://api.flickr.com/services/rest/?method=${flickrProperties.method}&api_key=${flickrProperties.api_key}
    &lat=${flickrProperties.lat}&lon=${flickrProperties.lon}&radius=${flickrProperties.radius}&format=${flickrProperties.format}&
    nojsoncallback=1&api_sig=06e5b87b66973167e7e0fdc55c9021ca`;
    axios.get(url)
      .then(response => response.json())
        .then(response => console.log(response));
        //if (response.status === "200")
       // let photos = response.json();
       // return photos;
      
  }; 
  checkConnection(){
    if(!navigator.onLine) {
      alert('Check your internet connection');
    }
  }
  addGoogleMapsScriptToPage(){
    let google_key = 'AIzaSyDk1ofIQBQEDmSeVrt1PU0FmokyLWp2KvQ';
    let script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?v=3&key=${google_key}"
    script.async = true;
    script.defer = true;
    console.log(script);
    document.body.appendChild(script);
  }

    componentDidMount(){
      const markers = [];

  this.checkConnection();
  //this.addGoogleMapsScriptToPage();
    
  //create stylish map    
  let styledMapType = new google.maps.StyledMapType(this.props.styleMap, {'name' : 'Styled Map'});
      
  let map = new google.maps.Map(this.myMapContainer.current, this.props.optionMap)
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
        
  //type of icons in markers  
  let defaultIcon = makeMarkerIcon('558000');
  let highlightedIcon = makeMarkerIcon('FFFF24');

  
        
    //create list of markers
   Places.map((place)=>{
    let title = place.name,
        image = place.img,
        id = place.id;
    //create infoWindow
     var infowindow = new google.maps.InfoWindow({
          content : `<div className="container" style ={{height : '325px'}}>
                      <h3>${title}</h3>
                        <span>${place.site}</span>
                        <span>tel. ${place.phone}</span>
                        <div><img src=${image} height = "100" width="100" alt=${title}></img></div>
                      </div>`
        });
        let position = {lat: place.location.lat, lng: place.location.lng};

  console.log(place.location.lat, place.location.lng);
        
  //create new Marker   
  var marker = new google.maps.Marker({
    map: map,
    position: position,
    title : title,
    animation: google.maps.Animation.DROP,
    icon: defaultIcon,
    id: id
  });
 this.fetchDataFromFlickr(place.location.lat, place.location.lng);    
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
  //add markers to state 
    
  this.setState({markers : markers});
  
})
console.log(markers)
 
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

      //console.log(this.props.openInfoWindow)
      //console.log(this.state.markers)
        return(
            <div ref={this.myMapContainer} 
            id="map" 
            onClick={this.props.openInfoWindow(this.state.markers)} 
            getMarkers={this.getMarkers}
            />
        )
    }
}
export default Map;

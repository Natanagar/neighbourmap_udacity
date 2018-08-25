import React, { Component } from 'react';
import './Map.css';
import Places from './places';
import styledMap from './styledMap';
/* global google */




class Map extends Component {
  constructor(props) {
    super(props);


    this.myMapContainer = React.createRef()
  }
  state = {
    arrayWithMarkers: [],
    arrayInfoWindow : [],
    content : '',
    map: false
  }
  
  //Set timeout to check if the Map is loaded
  checkTheMapIsLoaded = (timer) => {
    this.myMapContainer = '<div class="message">Trying to load GoogleMap, please wait...</div>';
    let timeout = timer || 5000;

    window.gm_authFailure = (error)=> {
      console.log(`error ${error}`)
      alert(`Couldn't load the Google Map. Check your internet connection`);
    } 
  }
 
  checkConnection(){
    if(!navigator.onLine) {
      alert('Check your internet connection');
    }
  }

  loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDk1ofIQBQEDmSeVrt1PU0FmokyLWp2KvQ&sensor=false"
    script.onreadystatechange = callback;
    script.onload = callback;
    setTimeout(() => {
          try{
              if (!google || !google.maps) {
                  //This will Throw the error if 'google' is not defined
                 alert('Google is not defined');
              }
          }
          catch (e) {
              //You can write the code for error handling here
              //Something like alert('Ah...Error Occurred!');
              alert(`'Ah...Error Occurred!`);
          }
      }, 5000);
    document.head.appendChild(script);
  }

  

 
componentDidMount(){

window.onload = this.loadScript;
  
//create googleMaps with Google API
  let optionMap = {
    center: {
      lat: 50.866077, 
      lng: 20.628568
  },
  scrollwheel : false,
  zoom : 14,
  mapTypeControl: false
  };

  let map = new google.maps.Map(this.myMapContainer.current, optionMap);
  this.setState({map});
  let styledMapType = new google.maps.StyledMapType(styledMap,{name: 'Styled Map'}); 
  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  
this.checkConnection();

      //checked load Map from googleAPI
      this.checkTheMapIsLoaded();
            
      //type of icons in markers  
      let defaultIcon = makeMarkerIcon('558000');
      //let highlightedIcon = makeMarkerIcon('FFFF24');

  
        
        //create list of markers
      Places.map((place)=>{
        
        let title = place.name,
            id = place.id;
            
            
       // this.fetchDataFromFlickr(); 
        let {imageFlickr, authorFlickr} = this.state;
        //create infoWindow
        let style = {
          'width': '300px',
          'borderRadius' : '5px',
          'backgroundColor' : "#ffe6e6"
        }
        let infowindow = new google.maps.InfoWindow({
              content : `<div className="infowindow" style={style}>
                          <h3>${title}</h3>
                            <span>${place.site}</span>
                            <span>tel. ${place.phone}</span>
                          </div>`
            });
          infowindow.addListener('closeclick', (() => infowindow.setMarker = null));
          //send request to Flickr
          
          
          //add infowindow to this.props.infoWindow
          this.state.arrayInfoWindow.push(infowindow);
          
        
            let position = {lat: place.location.lat, lng: place.location.lng};

        
      //create new Marker   
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title : title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: id,
        labelContent: "$425K",
        labelAnchor: new google.maps.Point(22, 0),
        labelClass: "labels", // the CSS class for the label
        labelStyle: {opacity: 0.75}
      });
    
    marker.infowindow = infowindow;
    infowindow.marker = marker;
  
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
  
//add markers to state to App.js 
  this.state.arrayWithMarkers.push(marker);
  //console.log(this.state.arrayWithMarkers);
  this.props.getArrayMarkers(this.state.arrayWithMarker);


  
})

 
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
//componentWillMount(){
 // this.props.getMapFromMapJS(this.state.map);
//}

    render(){
      let arrayWithMarkers = this.state.arrayWithMarkers;
      //arrayWithMarkers.map(marker => console.log(marker.infowindow));
      let arrayInfoWindow = this.state.arrayInfoWindow;
      // this.props.getContentInfoWindow(this.state.content);
      this.props.getMapFromMapJS(this.state.map);
      
      
        return(
            <div ref={this.myMapContainer} 
            id="map" 
            onKeyDown = {() => this.getInfoAboutMarkers}
            sendArray = {this.props.getArrayMarkers(arrayWithMarkers)} 
            onClick = {() => this.props.getArrayInfoWindow(arrayInfoWindow)}
            
            />
        )
    }
}
export default Map;

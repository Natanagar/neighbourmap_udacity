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

  //check authorization
    window.gm_authFailure = (error) => {
      console.log(`error ${error}`)
      alert(`Couldn't load the Google Map. Check your internet connection`);
    } 

    if(window.google && !window.google.maps) {
          setTimeout(() => {
              timeout += 200
              if(timeout > 5000){
                  this.myMapContainer.innerHTML = 'It seems that there is an internet connection error. Could not reach the GoogleMap API';
                  return;
              }else{
                  console.log('TRY LOAD');
                  this.checkTheMapIsLoaded(timeout);
              }
          }, 200);
      }
  }
 
  checkConnection(){
    if(!navigator.onLine) {
      alert('Check your internet connection');
    }
  }

  
 
componentDidMount(){
//check internet connection

this.checkConnection();

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
   
  //add attribute
  window.google.maps.event.addListener(map, "tilesloaded", function(){
      [].slice.apply(document.querySelectorAll('.google-map-container a img')).forEach(function(item) {
          item.setAttribute('tabindex','-1');
      });
  })


  //checked load Map from googleAPI
  this.checkTheMapIsLoaded();
  
  
  this.setState({map});
  let styledMapType = new google.maps.StyledMapType(styledMap,{name: 'Styled Map'}); 
  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  


      //type of icons in markers  
      let defaultIcon = makeMarkerIcon('558000');
      let highlightedIcon = makeMarkerIcon('FFFF24');

  
        
        //create list of markers
      Places.map((place)=>{
        
        let title = place.name,
            id = place.id;
              
            
      
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
/*marker.addListener('mouseover', (
  () => marker.setIcon(window.highlightedIcon) 
));*/

google.maps.event.addListener(infowindow,'closeclick',function(){
  marker.setAnimation(google.maps.Animation.BOUNCE);
});
marker.addListener('click', function () {
  marker.setAnimation(null);
});



//add markers to state to App.js 

 this.state.arrayWithMarkers.push(marker)
  //console.log(this.state.arrayWithMarkers);
  this.props.getArrayMarkers(this.state.arrayInfoWindow);
  
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
componentWillReceiveProps(){
  const { arrayWithMarkers, map, arrayInfoWindow } = this.state;

      const { clickedMarker, content } = this.props;

      let marker = clickedMarker[0];
      //marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      //marker.addListener('click', toggleBounce)
      arrayInfoWindow.map(infowindow => infowindow.setContent(content))
    }

    render(){
      console.log(this.props.placeID)
      const { arrayWithMarkers, map } = this.state;
      const {sortPlaces, clickedMarker, placeID} = this.props;
      
      
     
      arrayWithMarkers.map((marker) => { 
        let toogle = sortPlaces.find(place => place.id == marker.id) ? true : false
        marker.setVisible(toogle);
      })
      
      let arrayInfoWindow = this.state.arrayInfoWindow;
      this.props.getMapFromMapJS(this.state.map);

      let pressMarker = arrayWithMarkers.filter(marker => marker.id == placeID)
      console.log(pressMarker)
      if(pressMarker[0]){
        let pressInfowindow = pressMarker[0].infowindow;
        console.log(pressInfowindow)
        pressMarker[0].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
        pressMarker[0].setAnimation(google.maps.Animation.BOUNCE)
        
      }
    
      
        return(
            <div ref={this.myMapContainer} 
            id="map"
            role="application"
            onKeyDown = {() => this.getInfoAboutMarkers}
            sendarray = {this.props.getArrayMarkers(arrayWithMarkers)} 
            getarrayinfowindow = {this.props.getarrayinfowindow(arrayInfoWindow)}
            
            />
        )
    }
}
export default Map;

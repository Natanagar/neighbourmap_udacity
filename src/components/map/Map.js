import React, { Component } from 'react';
import './Map.css';
import Places from './places';
import axios from 'axios'
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
  getMarkers = (markers)=>{
    this.props.openInfoWindow(this.state.markers)
  }
  fetchDataFromFlickr = ()=> {
    let flickrKey = `8eea6e08f3cf6c850184fa8eebf05893`,
    url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}text=%E7%8C%AB&per_page=5&page=1&format=rest&api_sig=9f1beab3f0da8f620e197104eb81aa2a`,
    flickrSecret = `503f32d3c226e73f`;
    fetch(url)
      .then(reponse=>{

      })
      .catch(alert);
  }  

    componentDidMount() {
      const markers = [];
    
  //create stylish map    
  let styledMapType = new window.google.maps.StyledMapType(this.props.styleMap, {'name' : 'Styled Map'});
      
  let map = new window.google.maps.Map(this.myMapContainer.current, this.props.optionMap)
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
     var infowindow = new window.google.maps.InfoWindow({
          content : `<div className="container" style ={{height : '325px'}}>
                      <h3>${title}</h3>
                        <span>${place.site}</span>
                        <span>tel. ${place.phone}</span>
                        <div><img src={require(${image})} height = "100" width="100" alt=${title}></img></div>
                      </div>`
        });
        let position = {lat: place.location.lat, lng: place.location.lng};
        
  //create new Marker   
  var marker = new window.google.maps.Marker({
    map: map,
    position: position,
    title : title,
    animation: google.maps.Animation.DROP,
    icon: defaultIcon,
    id: id
  });
      
  markers.push(marker);
      
  //open infowindow
marker.addListener('click', function() {
  infowindow.open(map, marker);
});

window.google.maps.event.addListener(infowindow,'closeclick',function(){
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

  //fetch to flickr
  axios.get("https://api.flickr.com/services/feeds/photos_public.gne?tags=kitten&format=json&nojsoncallback=true") 
  .then((response) => {
    console.log(response.data.items);
    this.setState({
        items: response.data.items
    })
  })
  .catch((err) => {
  console.log(err)
  })
    
}


    render(){
      //console.log(this.props.openInfoWindow)
      //console.log(this.state.markers)
        return(
            <div ref={this.myMapContainer} 
            id="map" 
            onClick={this.props.openInfoWindow(this.state.markers)} 
            getMarkers={this.getMarkers.bind(this)}
            />
        )
    }
}
export default Map;
import React, { Component } from 'react';
import './Map.css';
import Places from './places';
import axios from 'axios';
/* global google */
/*import { url } from 'inspector';*/

class Map extends Component {
  constructor(props) {
    super(props);

    this.myMapContainer = React.createRef()
  }
  state = {
    arrayWithMarkers: [],
    arrayInfoWindow : []
  }
  

  //authentification user flickr
  fetchDataFromFlickr = ()=> {
    let flickrProperties = {
      apikey : `c9351625e1f32762afe260a1a6d8f28d`,
      format : `json`,
      method : `flickr.photos.search`,
      radius : 5,
    };
    const url = `https://api.flickr.com/services/rest/?method=${flickrProperties.method}&
    api_key=884f864a560913889588323bb96d4433&tags=Kielce&radius=${flickrProperties.radius}&format=${flickrProperties.format}&nojsoncallback=1`;

    //response with axios
    axios.get(url)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
          return response;
      } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error
      }
      })
      .then((response) => {
      if (response.headers['content-type'] !== 'application/json') {
          let error = new Error('This is uncorrect response from server');
          error.response = response;
          throw error
      }
      return response.data;
      })
      .then((json) => {
          let arrayPics = json.photos.photo;
          console.log(arrayPics);
          let photo = arrayPics.filter(pic => pic.ispublic & !(pic.isfamily) & !(pic.isfriend))[0]
          console.log(photo);
          return {
            imgSource: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            author: `http://www.flickr.com/photos/${photo.owner}/${photo.id}`
          
        }
        
      })
      .catch((error) => {
       console.log(error);
     });
  }; 
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
    this.checkConnection();
    
    //this.addGoogleMapsScriptToPage();
    
    
      //create stylish map    
      let styledMapType = new window.google.maps.StyledMapType(this.props.styleMap, {'name' : 'Styled Map'});
          
      let map = new window.google.maps.Map(this.myMapContainer.current, this.props.optionMap)
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');

      //checked load Map from googleAPI
      this.checkTheMapIsLoaded();
            
      //type of icons in markers  
      let defaultIcon = makeMarkerIcon('558000');
      let highlightedIcon = makeMarkerIcon('FFFF24');

  
        
        //create list of markers
      Places.map((place)=>{
      
        let title = place.name,
            image = place.img,
            id = place.id,
            lat = place.location.lat,
            lng = place.location.lng;
        //create infoWindow
        var infowindow = new google.maps.InfoWindow({
              content : `<div className="container" style ={{height : '325px'}}>
                          <h3>${title}</h3>
                            <span>${place.site}</span>
                            <span>tel. ${place.phone}</span>
                            <div>
                              <img src={images['0.jpg']} height = "200" width="200" alt=${title} />
                            </div>
                          </div>`
            });
          //send request to Flickr
          this.fetchDataFromFlickr();
          
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
        id: id
      });
    
  
      
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


    render(){
      let arrayWithMarkers = this.state.arrayWithMarkers;
      let arrayInfoWindow = this.state.arrayInfoWindow;
      
        return(
            <div ref={this.myMapContainer} 
            id="map" 
            onKeyDown = {() => this.getInfoAboutMarkers}

            onLoad={() => this.props.getArrayMarkers(arrayWithMarkers)} 
            onClick = {() => this.props.getArrayInfoWindow(arrayInfoWindow)}
            />
        )
    }
}
export default Map;

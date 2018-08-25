import React, { Component } from 'react';
import Map from './components/map/Map';
import MarkersPanel from './components/MarkersPanel';
import Navbar from './components/Navbar';
import { Container, Row, Col } from 'reactstrap';
import Footer from './components/Footer';
import Places from './components/map/places';
import './App.css';
import ErrorBoundary from './components/HandleError';
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class App extends Component {
  constructor(props){
    super(props)
    this.getArrayMarkers = this.getArrayMarkers.bind(this);
    this.getArrayInfoWindow = this.getArrayInfoWindow.bind(this);
    this.getValueFromMarkerPanel = this.getValueFromMarkerPanel.bind(this);
    this.clickInfoWindow = this.clickInfoWindow.bind(this);
    this.getContentInfoWindow = this.getContentInfoWindow.bind(this);
    this.getMapFromMapJS = this.getMapFromMapJS.bind(this);
    this.handleChangePlacesAndMarkers = this.handleChangePlacesAndMarkers.bind(this);
  } 
  state = {
    width : 0,
    height : 0,
    Places : Places,
    InfoWindow : [],
    allMarkers : [],
    foundedPlaces : Places,
    map : false,
    value : "",
    content : ''
}


 //get array with infoWindow
 getArrayInfoWindow(arrayInfoWindow){

   if(arrayInfoWindow !== this.state.InfoWindow){
      this.setState({
        InfoWindow : arrayInfoWindow
    })
   }
   //array with infoWindow
 }
getMapFromMapJS = (map) => {
  if(this.state.map !== map){
    this.setState({map : map})
  }
}
//get array with markers from map component
 getArrayMarkers(arrayWithMarkers){
   if(this.state.allMarkers !== arrayWithMarkers){
    this.setState({
      allMarkers : arrayWithMarkers
    })
  }
}


onClearInput = () =>{
  console.log('clear')
} 

handleChangePlacesAndMarkers(event, element){
  const match = new RegExp(escapeRegExp(this.state.value, 'i'));
  const foundPlaces = this.state.foundedPlaces.filter((place)=>match.test(place.name));
  if (foundPlaces !== this.state.foundedPlaces) 
    this.setState({
      foundedPlaces : foundPlaces.sort(sortBy('name'))
    });
    this.sortingMarkers();
}
 // open and close InfoWindow
 sortingMarkers = (event, element) => {
   console.log("banana");
   console.log( this.state.foundPlacesFromMarkerPanel);
  /*const { foundedPlaces, allMarkers } = this.state;
  for(let i=0; i<foundedPlaces.length; i++){
    for(let a=0; a < allMarkers.length; i++){
      //console.log(allMarkers[a].id)
    }
  }*/
  /*let markers = Array.from(this.state.allMarkers);
  for(let i=0; i< foundPlaces.length; i++){
    for(let a=0; a<markers.length; a++){
      if(markers[a].get('id') === foundPlaces[i].id){
          markers[a].setVisible(true);
          let { map } = this.state;
          this.bindInfoWindow(markers[a], map)
      } else {markers[a].setVisible(false)}
    }
  }*/
}

//click to InfoWindow and add new Content
clickInfoWindow = (event, element) => {
  let placeID = event.currentTarget.id;
  //console.log(placeID);
  let { allMarkers } = this.state;
  
  
  let marker = allMarkers.filter(marker => marker.id == placeID);
  //console.log(marker);
  let { map } = this.state;
  this.fetchDataFromFlickr();
  this.bindInfoWindow(marker, map);
  
}
bindInfoWindow = (marker, map, content, event) =>{
  let html = this.state.content;
  let infowindow = marker.infowindow;
   infowindow.setContent(html);
   infowindow.open(map.marker);
  };
 
//get value from MarkerPanel
getValueFromMarkerPanel = (value) => {
  if(value !== this.state.value){ 
    this.setState({
      value : value
    })
  }
}
//get content from Map.js
getContentInfoWindow = (content) => {
  if(content !== this.state.content){
    this.setState({
      content : content
    })
  }

}
   //authentification user flickr
 fetchDataFromFlickr = ()=> {
  let flickrProperties = {
    apikey : `dc1fa29f1d6ba587a26ef719ef5f1107`,
    format : `json`,
    method : `flickr.photos.search`,
    radius : 5,
  };
  const url = `https://api.flickr.com/services/rest/?method=${flickrProperties.method}&
  api_key=${flickrProperties.apikey}&tags=Kielce&radius=${flickrProperties.radius}&format=${flickrProperties.format}&nojsoncallback=1`;

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
        //console.log(arrayPics);
        let photo = arrayPics.filter(pic => pic.ispublic & !(pic.isfamily) & !(pic.isfriend))[0]
        
        let imageFromFlickr = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            authorPics = `http://www.flickr.com/photos/${photo.owner}/${photo.id}`;
            this.setState({
              content : `<div className="infowindow">
              <a href=${imageFromFlickr} alt='photo' >Pics from Flickr</a>
              <a href=${authorPics} alt='author'> by the ${authorPics}</a>
            </div>`}) ;
          })
          
          
    .catch((error) => {
     console.log(error);
   });
}; 


  render(){ 
    const { foundedPlaces } = this.state;
      return (
        <Container className="App">
          <Row>
              <Col>
                <Navbar 
                aria-label="Main menu button" 
                tabIndex="0" 
                role="menu"
                />
              </Col>
            </Row>
          <Row>
            <Col ml="4" xl="4">
              <MarkersPanel 
              listOfMarkers={this.state.Places}
              changeMarkers={this.updateMarkers}
              sortingMarkers={this.sortingMarkers}
              getPlaces={this.getFoundPlaces}
              getValueFromMarkerPanel={this.getValueFromMarkerPanel}
              clickInfoWindow={this.clickInfoWindow}
              handleChangePlacesAndMarkers={this.handleChangePlacesAndMarkers}
              places = {foundedPlaces}
             
              />
            </Col>
            <Col ml="8" xl="8">
              
            <ErrorBoundary>
                <Map
                markers={this.state.allMarkers}
                map={this.state.map}
                optionMap = {this.state.optionMap}
                styleMap={this.state.styleMap}
                places={this.state.Places}
                tabIndex="-1"
                role = "application"
                aria-label="google map"
                openInfoWindow={event => this.showInfowindow }
                getArrayMarkers={this.getArrayMarkers}
                getArrayInfoWindow={this.getArrayInfoWindow}
                getContentInfoWindow={event => this.getContentInfoWindow}
                getMapFromMapJS={this.getMapFromMapJS}
                handleChangePlacesAndMarkers = {this.handleChangePlacesAndMarkers}
                
                />
              </ErrorBoundary>
            </Col>
          </Row>
          <Row>
              <Col>
                <Footer className=".col-12"/>
              </Col>
          </Row>
        </Container>
       
      );
      
    }
  }  

  
  
export default App;

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
    this.getarrayinfowindow = this.getarrayinfowindow.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    foundPlaces : Places,
    map : false,
    value : "",
    content : ''
}


 //get array with infoWindow
 getarrayinfowindow(arrayInfoWindow){
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

handleChangePlacesAndMarkers(event, element){
  const match = new RegExp(escapeRegExp(this.state.value, 'i'));
  const sortedPlaces = this.state.foundPlaces.filter((place)=>match.test(place.name));
  if (sortedPlaces !== this.state.foundPlaces) 
    this.setState({
      foundPlaces : sortedPlaces.sort(sortBy('name'))
    });
    this.sortingMarkers();
}
 // open and close InfoWindow
 sortingMarkers = (event, element) => {
  const { foundPlaces, allMarkers, map, value } = this.state;
 
  this.withoutSorting();
  if(value == ""){
    this.setState({
      foundPlaces: Places
    })
  }
  if(foundPlaces.length == 0){
    allMarkers.forEach((marker)=>{
      marker.setVisible(false)
    })
  }
   //logics with compare markers maybe reduce
  allMarkers.forEach((marker)=>{
    this.fetchDataFromFlickr(); 
    let toogle = foundPlaces.find(place => place.id === marker.id) ? true : false
     marker.setVisible(toogle);
     //change content infowindow
     this.changeContentInfoWindow(marker);
  })
  
}
//sorting with zero value and foundPlaces
withoutSorting = (value, foundPlaces) => {
   if(value == "" && foundPlaces.length == 0){
    this.setState({
      foundPlaces : Places,
      value : ''
    })
   }
}
//change content infowndow
changeContentInfoWindow = (marker) => {
 if (marker.getVisible) {
  marker.infowindow.setContent(this.state.content);
 }
}

//click to InfoWindow and add new Content
clickInfoWindow = (event, element) => {
  const { map } = this.state;
  let placeID = event.currentTarget.id;
  let { allMarkers, InfoWindow } = this.state;
    let infowindow = InfoWindow.find(infowindow=>infowindow.marker.id == placeID)
    let marker = infowindow.marker;
    console.log(marker, infowindow);
    infowindow.open(marker, map)
    this.closeInfowindow();
  }

//close infowindow
closeInfowindow = (infowindow) => {
  const { map } = this.state;
  setTimeout((
   infowindow.close()
  ), 2000)
}
  
 
//get value from MarkerPanel
handleChange = (event, value) => {
  console.log(event.target.value)
  
  if(value !== this.state.value){ 
    this.setState({
      value : event.target.value.substr(0,20)
    })  
    //load algorithm sorting
    setTimeout((this.handleChangePlacesAndMarkers()), 2000)
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
  let index = Math.floor(Math.random()*(20)) + 1;
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
        let photo = arrayPics.filter(pic => pic.ispublic & !(pic.isfamily) & !(pic.isfriend))[index]
        
        let imageFromFlickr = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            authorPics = `http://www.flickr.com/photos/${photo.owner}/${photo.id}`;
            this.setState({
              content : `<div className="infowindow>
                              <img className="image"src="${imageFromFlickr}" alt ='Photo from Flickr'>
                              <a href = ${authorPics} alt='author'> by the ${authorPics}</a>
                            from Flickr
                      </div>`}) ;
          })
          
          
    .catch((error) => {
     console.log(error);
   });
}; 


  render(){ 
    const { foundPlaces, value } = this.state;
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
              handleChange={this.handleChange}
              clickInfoWindow={this.clickInfoWindow}
              handleChangePlacesAndMarkers={this.handleChangePlacesAndMarkers}
              sortPlaces = {foundPlaces}
              value = {value}
             
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
                getarrayinfowindow={this.getarrayinfowindow}
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

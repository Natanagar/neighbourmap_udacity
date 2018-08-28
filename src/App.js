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
    content : '',
    clickedMarker : " ",
    placeID : false,
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
 getArrayMarkers(arrayInfoWindow){
   if(this.state.allMarkers !== arrayInfoWindow){
    this.setState({
      allMarkers : arrayInfoWindow
    })
  }
}

//change content infowndow
changeContentInfoWindow = (marker) => {
if (marker.getVisible) {
marker.infowindow.setContent(this.state.content);
}
}
 
//sorting with zero value and foundPlaces
withoutSorting = (value, foundPlaces) => {
   if(value === "" && foundPlaces.length === 0){
    this.setState({
      foundPlaces : Places,
      value : ''
    })
   }
}


//click to InfoWindow and add new Content
clickInfoWindow = (event, element) => {
  let placeID = event.currentTarget.id;
  
  const { allMarkers} = this.state;
  let pressMarker = allMarkers.filter(marker => marker.id == placeID);
  console.log(pressMarker);
  this.fetchDataFromFlickr(placeID);

  

  this.setState({
    clickedMarker : pressMarker,
    placeID : placeID
  })
}
  
//close infowindow
closeInfowindow = (infowindow) => {
  setTimeout((
   infowindow.close()
  ), 2000)
}
  
 
//get value from MarkerPanel
handleChange = (event, value) => {
  value = event.target.value.substr(0, 20);
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
 fetchDataFromFlickr = (id)=> {
   //console.log(id);
  const { Places } = this.state;
  let pressPlace = Places.filter(el => el.id == id)
  //console.log(pressPlace)
  let title = pressPlace[0].polishName;
  let phone = pressPlace[0].phone;
  let site = pressPlace[0].site;
  //console.log(title, phone, site)
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
        alert (`Error loading pics ${error}`);
        
        
    }
    })
    .then((response) => {
    if (response.headers['content-type'] !== 'application/json') {
        let error = new Error('This is uncorrect response from server');
        error.response = response;
        throw error
        alert ('This is uncorrect response from server')
        
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
              content : `<div className="infowindow style ={{
                width: "100%",
                height: "300px",
                backgroundImage: "url(" + { imageFromFlickr } + ")",
                border: '1px solid black',
                borderRadius: '5px!important'

              }}>
                              <div>
                                <h4>${title}</h4>
                                  <img className="image"src=${imageFromFlickr} alt =${title}><img>
                                  <section>${site}</section>
                                  <section>tel. ${phone}</section>
                                  <section><a href = ${authorPics} alt='author'> by the ${authorPics}</a><section>
                              from Flickr
                            </div>
                      </div>`}) ;
          })
          
          
    .catch((error) => {
     console.log(error);
     alert(`Server can't load picture. Searching picture is not not available`);
   });
}; 


  render(){
    
   const { foundPlaces, value} = this.state;
    const findPlaces = foundPlaces.filter(
      place => {
        return place.englishName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    

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
              getPlaces={this.getFoundPlaces}
              handleChange={this.handleChange}
              clickInfoWindow={this.clickInfoWindow}
              sortPlaces = {findPlaces.sort(sortBy('name'))}
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
                sortPlaces = {findPlaces.sort(sortBy('name'))}
                clickedMarker = {this.state.clickedMarker}
                content={this.state.content}
                arrayInfoWindow ={this.state.arrayInfoWindow}
                placeID={this.state.placeID}
                
                
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

import React, { Component } from 'react';
import Map from './components/map/Map';
import MarkersPanel from './components/MarkersPanel';
import Navbar from './components/Navbar';
import { Container, Row, Col } from 'reactstrap';
import Footer from './components/Footer';
import Places from './components/map/places';
import './App.css';
import ErrorBoundary from './components/HandleError';
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
  } 
  state = {
    width : 0,
    height : 0,
    Places : Places,
    foundPlacesFromMarkerPanel : [],
    InfoWindow : [],
    allMarkers : [],
    foundedPlaces : [],
    map : false,
    value : ""
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

//get array with markers from map component
 getArrayMarkers(arrayWithMarkers){
   if(this.state.allMarkers !== arrayWithMarkers){
    this.setState({
      allMarkers : arrayWithMarkers
    })
  }
}
 // open and close InfoWindow
 sortingMarkers = (event, element) => {
  let filterPlaces = this.state.foundPlacesFromMarkerPanel;
  let markers = Array.from(this.state.allMarkers);
  let placeID = event.currentTarget.id;
  for(let i=0; i< filterPlaces.length; i++){
    for(let a=0; a<markers.length; a++){
      if(markers[a].get('id') === filterPlaces[i].id){
          markers[a].setVisible(true)
      } else {markers[a].setVisible(false)}
    }
  }
}

//click to InfoWindow and add new Content
clickInfoWindow = (event) => {
  console.log('yoyoyoy');
}

//get array with sorting places from markerlist
getFoundPlaces = (foundedPlaces) => {
  
  if(foundedPlaces !== this.state.foundPlacesFromMarkerPanel){
     this.setState({
       foundPlacesFromMarkerPanel : foundedPlaces
     })
     //console.log(this.state.foundPlacesFromMarkerPanel)
  }
 }
//get value from MarkerPanel
getValueFromMarkerPanel = (value) => {
  if(value !== this.state.value){
    this.setState({
      value : value
    })
  }
}
//get content from Map.js
getContentInfoWindow = (event) => {
  console.log('click-click')
}
  //new window.google.maps.event.trigger(marker, 'click'); */
  render(){
    //const marker = this.state.markers.filter(marker => {marker.id===markerID})
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
                getContentInfoWindow={this.getContentInfoWindow}
                
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

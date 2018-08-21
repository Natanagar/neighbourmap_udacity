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
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getArrayMarkers = this.getArrayMarkers.bind(this);
    this.getArrayInfoWindow = this.getArrayInfoWindow.bind(this);
    this.getFoundPlaces = this.getFoundPlaces.bind(this);
    this.getValueFromMarkerPanel = this.getValueFromMarkerPanel.bind(this)
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
//get array with sorting places from markerlist
getFoundPlaces = (foundedPlaces) => {
  
 /*if(foundedPlaces !== this.state.foundPlacesFromMarkerPanel){
    this.setState({
      foundPlacesFromMarkerPanel : foundedPlaces
    })
    console.log(this.state.foundPlacesFromMarkerPanel)
 }*/
}
 //get array with infoWindow
 getArrayInfoWindow(arrayInfoWindow){

   if(arrayInfoWindow !== this.state.InfoWindow){
      this.setState({
        InfoWindow : arrayInfoWindow
    })
   }
   //array with infoWindow
  console.log(this.state.InfoWindow);
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
  console.log(placeID);
  const markerSorted = markers.find(marker =>  marker.get('id') === placeID);
  
  /*return filterPlaces.map((place, i) => {
    if (markers.some(marker => marker.get('id') === place.id)) {  // If there's a match
      this.marker.setVisible(true);
    } else {
      this.marker.setVisible(false);
    }*/
  }

getValueFromMarkerPanel = (value) => {
  if(value !== this.state.value){
    this.setState({
      value : value
    })
    console.log(this.state.value)
  }
}


  /*const markerID = event.currentTarget.id;
  let filterMarker = this.state.foundPlacesFromMarkerPanel;
  let markers = this.state.allMarkers;
  for(let i = 0; i < filterMarker.length; i++ ){
      let filteredMarker = filterMarker[i].id;
      console.log(filteredMarker)
        for(let j=0; j< markers.length; i++){
          let marker = markers[j].get('id');
            console.log(marker)
            if(filteredMarker === marker){
              marker.setVisible(true)
              console.log(`WE HAVE MATCHING MARKERS`);
            } else {
              console.log(`MARKERS ARE NOT MATCHING`)
              marker.setVisible(false);
            }
      
    }
    
  } 
  //new window.google.maps.event.trigger(marker, 'click'); */


  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    this.setState({Places : Places})
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
  } 

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  } 


  
  render() {
  // console.log(this.state.allMarkers);
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

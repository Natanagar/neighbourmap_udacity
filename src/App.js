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
  } 
  state = {
    width : 0,
    height : 0,
    Places : Places,
    foundPlacesFromMarkerPanel : [],
    InfoWindow : [],
    allMarkers : [],
    foundedPlaces : [],
    map : false
}
//get array with sorting places from markerlist
getFoundPlaces = (foundedPlaces) => {
 if(foundedPlaces !== this.state.foundPlacesFromMarkerPanel){
    this.setState({
      foundPlacesFromMarkerPanel : foundedPlaces
    })
 }
}
 //get array with infoWindow
 getArrayInfoWindow(arrayInfoWindow){
      this.setState({
        InfoWindow : arrayInfoWindow
   })

   //array with infoWindow
   //console.log(this.state.InfoWindow);
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
 showInfowindow = (event, element)=> {
  console.log('yoyoy');
  let markerId = this.state.allMarkers.filter(marker => (console.log(marker.get('id'))));  
  //console.log(markerID);
  return markerId;
  

  //const marker = this.state.markers.filter(marker => marker.id === markerID);        
  //new window.google.maps.event.trigger(marker, 'click');  
}

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
 console.log(this.state);
  //console.log(this.state.InfoWindow);
  // console.log(this.state.allMarkers);
  //const marker = this.state.markers.filter(marker => {marker.id===markerID})
    return (
      <Container className="App">
        <Row>
            <Col>
              <Navbar />
            </Col>
          </Row>
        <Row>
          <Col ml="4" xl="4">
            <MarkersPanel 
            listOfMarkers={this.state.Places}
            changeMarkers={this.updateMarkers}
            openInfoWindow={this.showInfowindow}
            getPlaces={this.getFoundPlaces}
           
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
              tabIndex="0" 
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

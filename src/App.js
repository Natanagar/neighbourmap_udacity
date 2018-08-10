import React, { Component } from 'react';
import Map from './components/map/Map';
import MarkersPanel from './components/MarkersPanel';
import Navbar from './components/Navbar';
import { Container, Row, Col } from 'reactstrap';
import Footer from './components/Footer';
import Places from './components/map/places';
import './App.css';
import ErrorBoundary from './components/HandleError'


class App extends Component {
  constructor(props){
    super(props)
  
  }
  state ={
    Places : []
  }
  componentDidMount(){
    this.setState({Places : Places})
  }
  showInfowindow = (event)=> {
    console.log('yoyoy')
    console.log(event.target.innerHTML)
    //console.log(this.state.markers)
    //const marker = this.state.markers.find(el => el.id === element);        
    //new window.google.maps.event.trigger(marker, 'click');  
}
  
  render() {
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
            openInfoWindow={ (event) =>this.showInfowindow(event) }
            
            />
          </Col>
          <Col ml="8" xl="8">
            <ErrorBoundary>
              <Map
              tabIndex="0" 
              aria-label="google map"
              openInfoWindow={ (event) =>this.showInfowindow(event) }
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

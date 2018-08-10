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
  state ={
    Places : []
  }
  componentDidMount(){
    this.setState({Places : Places})
  }
  showInfoWindow(){
    console.log(`changeMarkers ${Places}`)
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
            
            />
          </Col>
          <Col ml="8" xl="8">
            <ErrorBoundary>
              <Map 
              showInfoWindow={this.updateMarkers}
              openInfoWindow={this.showInfoWindow.bind(this)}
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

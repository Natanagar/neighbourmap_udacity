import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/map/Map';
import SearchBar from './components/SearchBar';
import MarkersPanel from './components/MarkersPanel';
import Navbar from './components/Navbar';
import { Container, Row, Col, Alert } from 'reactstrap';
import Footer from './components/Footer';
import Places from './components/map/places';
import './App.css';


class App extends Component {
  state ={
    Places : []
  }
  componentDidMount(){
    this.setState({Places : Places})
  }
  updateMarkers(){
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
            <Map 
            showInfoWindow={this.updateMarkers}
            />
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

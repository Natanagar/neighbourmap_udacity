import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/map/Map';
import SearchBar from './components/SearchBar';
import MarkersPanel from './components/MarkersPanel';
import Navbar from './components/Navbar';
import { Container, Row, Col, Alert } from 'reactstrap';
import Footer from './components/Footer';
import './App.css';


class App extends Component {
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
            <MarkersPanel />
          </Col>
          <Col ml="8" xl="8">
            <Map />
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

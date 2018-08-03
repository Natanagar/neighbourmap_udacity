import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/map/Map';
import SearchBar from './components/SearchBar';
import {Alert} from 'reactstrap';
import './App.css';

class App extends Component {
  state={
    lat : -34.397,
    lng : 150.644
  }
  render() {
    return (
      <div className="App">
        <SearchBar />
        <Map />
      </div>
    );
  }
}

export default App;

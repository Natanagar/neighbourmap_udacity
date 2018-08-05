import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import Places from './places';

 /* global google */


class Map extends Component {
    constructor(props){
        super(props);
    //state = {
        //no state
    //    }
    //createRef()
    this.myMapContainer = React.createRef()
    }

    componentDidMount(){
      const markers = [];
      
      //console.log(Places);
      //console.log (markers);
        var styledMapType = new google.maps.StyledMapType(
            [
                {
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#ebe3cd"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#523735"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#f5f1e6"
                    }
                  ]
                },
                {
                  "featureType": "administrative",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#c9b2a6"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#dcd2be"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#ae9e90"
                    }
                  ]
                },
                {
                  "featureType": "landscape.natural",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#dfd2ae"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#dfd2ae"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#93817c"
                    }
                  ]
                },
                {
                  "featureType": "poi.business",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#a5b076"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#447530"
                    }
                  ]
                },
                {
                  "featureType": "poi.school",
                  "elementType": "labels.text",
                  "stylers": [
                    {
                      "color": "#461116"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#f5f1e6"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road.arterial",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#fdfcf8"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#f8c967"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#e9bc62"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road.highway.controlled_access",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#e98d58"
                    }
                  ]
                },
                {
                  "featureType": "road.highway.controlled_access",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#db8555"
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#806b63"
                    }
                  ]
                },
                {
                  "featureType": "transit",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "transit.line",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#dfd2ae"
                    }
                  ]
                },
                {
                  "featureType": "transit.line",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#8f7d77"
                    }
                  ]
                },
                {
                  "featureType": "transit.line",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#ebe3cd"
                    }
                  ]
                },
                {
                  "featureType": "transit.station",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#dfd2ae"
                    }
                  ]
                },
                {
                  "featureType": "transit.station.airport",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "color": "#ff3d50"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#b9d3c2"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#6083ff"
                    },
                    {
                      "visibility": "on"
                    },
                    {
                      "weight": 3.5
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "saturation": 30
                    },
                    {
                      "lightness": 25
                    },
                    {
                      "visibility": "on"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#92998d"
                    }
                  ]
                }
              ], {'name' : 'Styled Map'}
        );
        let map = new google.maps.Map(this.myMapContainer.current, {
            center: {
                lat: 50.866077, 
                lng: 20.628568
            },
            scrollwheel : false,
            zoom : 14,
            mapTypeControl: false

        })
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
        
      //type of icons in markers  
    var defaultIcon = makeMarkerIcon('558000');
    var highlightedIcon = makeMarkerIcon('FFFF24');
        
    //create list of markers
   Places.map((place)=>{
    let title = place.name,
        image = place.img;
     //console.log(place.location.lat)
     //console.log(place.location.lng)
     //console.log(title)
     var infowindow = new google.maps.InfoWindow({
          content : `<div className="container" style ={{
              height : '125px'
          }}>
                      <h3>${title}</h3>
                        <span>${place.site}</span>
                        <span>tel. ${place.phone}</span>
                          <div><img src=${image} height = "100" width="100"></img>
                          </div>
                      </div>`
        });
        let position = {lat: place.location.lat, lng: place.location.lng};
        
        console.log(position);
        var marker = new google.maps.Marker({
          map: map,
          position: position,
          title : title,
          animation: google.maps.Animation.DROP,
          icon: defaultIcon,
          id: 1
        });
      markers.push(marker);
      //open infowindow
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      google.maps.event.addListener(infowindow,'closeclick',function(){
        marker.setAnimation(google.maps.Animation.BOUNCE);
      });
      marker.addListener('click', function () {
        marker.setAnimation(null);
      });

   })

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21,34));
    return markerImage;
  }
    
}
 

    render(){
        return(
            <div ref={this.myMapContainer} id="map" />
        )
    }
}
export default Map;
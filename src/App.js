import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import logo from './logo.svg';
import './App.css';
import Flat from './components/flat';
import Marker from './components/marker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      selectedFlat: null,
      search: ""
    };
  }

  componentDidMount() {
    fetch("./appartments.json")
      .then(response => response.json())
      .then((data) => {
        this.setState({
          flats: data
        })
      })
  }

  selectFlat = (flat) => {
    console.log(flat);
    this.setState({
      selectedFlat: flat
    })
  }

  handleSearch = (event) => {
    this.setState ({
      search: event.target.value,
      flats: this.state.flats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
    })
  }



  render() {
    // const flat =   {
  //   "name": "ideal Apartment for 2 persons 45m2",
  //   "imageUrl": "/images/9a169651-04b1-4ea0-b510-49f41c9a186b.jpg",
  //   "price": 164,
  //   "priceCurrency": "EUR",
  //   "lat": 52.357522,
  //   "lng": 4.897364
  // };

    // const flats = [ flat, flat, flat, flat, flat, flat ];
    let center = {
      lat: 52.369282,
      lng: 4.897362
    }

    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng,
      }
    }


    return (
      <div className="app">
        <div className="main">
          <div className="search">
            <input
              type="text"
              placeholder="Zoek ..."
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
          <div className="flats">
            {this.state.flats.map((flat) => {
              return <Flat
              key={flat.name}
              flat={flat}
              selectFlat={this.selectFlat} />
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDrTzy4Ni-jP0qghaTe1wWdEuL01-j9I4s" }}
            center={center}
            zoom={11}
          >
            {this.state.flats.map((flat) => {
              return <Marker
              key={flat.name}
              lat={flat.lat}
              lng={flat.lng}
              text={flat.price}
              curr={flat.priceCurrency}
              selected={flat === this.state.selectedFlat}
              />
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;

import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";
import { base } from './base';


// function Map() {
//   const [pos, setPos] = useState(null);
//   const [selectedPark, setSelectedPark] = useState(null);


//   navigator.geolocation.watchPosition(function(position) {
//     console.log(position.coords.latitude, position.coords.longitude);
//     setPos(position)
//   });

//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 22.197992, lng: 113.541649 }}
//       defaultOptions={{ styles: mapStyles }}
//       onClick={() => {
//         const markerPosition = pos.latLng;
//         console.log("aaa");
//         console.log(pos.coords.latitude);
//       }}
//     >
      
//       {pos
//         ? (
//           <Marker
//             position={{
//               lat: pos.coords.latitude,
//               lng: pos.coords.longitude
//             }}
//           />
//         )
//         : null
//       }

//     </GoogleMap>
//   );
// }

class Map extends React.Component {
  nameRef = React.createRef();

  constructor(props) {
    super(props)

    this.state = {
      latLng: undefined,
      status : "Please select a loction that u want to share.",
      location: { }
    }
    this.handleClick = this.handleClick.bind(this);
    this.clickClick = this.clickClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      location : [...this.state.location, this.state.latLng]
    })
    console.log(JSON.stringify(this.state.location))
  }

  clickClick(k) {
    // k.preventDefault();
    // var bbb = this.nameRef.current.value
    // this.setState({
    //   Place: [...this.state.Place, bbb]
    // });
    // console.log(JSON.stringify(this.state.Place))
    // this.nameRef.current.value = '';
  }

  componentWillMount() {
    this.songsRef = base.syncState('songs', {
      context: this,
      state: 'songs'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.songsRef);
  }

  render () {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 22.197992, lng: 113.541649 }}
        defaultOptions={{ styles: mapStyles }}
        onClick={(e) => {
          console.log(JSON.stringify(e.latLng))
          this.setState({
            latLng: e.latLng,
            status : "R u sure to share this location?"
          })
        }}

      >  
        <div style = {{
          backgroundColor : 'Tomato',
          textAlign: 'center',
          fontFamily:"fantasy",
          fontSize : 20,
          width: 600,
          height: 100,
          position: 'fixed',
          bottom: 0,
          left: 750
        }}>
          {this.state.status}
          {JSON.stringify(this.state.latLng)}
        </div>

        {this.state.latLng
          ? (
            <Marker
              position={this.state.latLng}
            >
              {/* <InfoWindow
                position={this.state.latLng}
                onCloseClick={() => {
                  this.setState({
                    latLng: null
                  })
                }}
              >
                <div>
                <h2>{JSON.stringify(this.state.latLng)}</h2>

                </div>
              </InfoWindow> */}
            </Marker>
          )
          : null
        }

        <div style = {{
          position: 'fixed',
          bottom: 0,
          left: 750
        }}>
          <button onClick={this.handleClick}>
            HI
          </button>
          <form >
            請輸入文字：<input type = "text" value={this.state.value} ref={this.nameRef}/>
            <button onClick={this.clickClick}>Click Me!</button>
          </form>
        </div>

      </GoogleMap>
    )
  }
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB3w1a9mbZWWiaOpQYeee_wxPimMmK2dzw`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
// {parkData.features.map(park => (
//   <Marker
//     key={park.properties.PARK_ID}
//     position={{
//       lat: park.geometry.coordinates[1],
//       lng: park.geometry.coordinates[0]
//     }}
//     onClick={() => {
//      setSelectedPark(park);
//    }}
//   />
// ))}
// {selectedPark && (
//   <InfoWindow
//     onCloseClick={() => {
//       setSelectedPark(null);
//     }}
//     position={{
//       lat: selectedPark.geometry.coordinates[1],
//       lng: selectedPark.geometry.coordinates[0]
//     }}
//   >
//     <div>
//       <h2>{selectedPark.properties.NAME}</h2>
//       <p>{selectedPark.properties.DESCRIPTIO}</p>
//     </div>
//   </InfoWindow>
// )}

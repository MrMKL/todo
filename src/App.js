import React, { useState }  from 'react';
import logo from './marker-editor.svg';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "./data/skateboard-parks.json";

var data = [

]


function App() {
  const [viewport, setViewport] = useState({
    latitude: 22.197992,
    longitude: 113.541649,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);

  return (
    <div>
    hjhkh

      <ReactMapGL {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mrmkl/cjy727w3212jb1co3bdvwwtqw"
        onViewportChange={viewport => {setViewport(viewport);}}
      >
      YOOO
      {parkDate.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          latitude={park.geometry.coordinates[1]}
          longitude={park.geometry.coordinates[0]}
        >

        <button
          className="marker-btn"
          onClick={e => {
            e.preventDefault();
            setSelectedPark(park);
          }}
        >
          <img src={logo} alt="Skate Park Icon" />
        </button>

        </Marker>
      ))}

      {selectedPark ? (
        <Popup
          latitude={selectedPark.geometry.coordinates[1]}
          longitude={selectedPark.geometry.coordinates[0]}
          onClose={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      ) : null}


      </ReactMapGL>
    </div>
  );
}

// class App extends React.Component {
//
//   nameRef = React.createRef();
//
//   const [viewport, setViewport] = useState({
//     latitude: 45.4211,
//     longitude: -75.6903,
//     width: "100vw",
//     height: "100vh",
//     zoom: 10
//   });
//
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       aaa : []
//     }
//
//     this.handleClick = this.handleClick.bind(this);
//   }
//
//   handleClick(e) {
//     e.preventDefault();
//     console.log(this.state.aaa);
//     var bbb = this.nameRef.current.value
//     this.setState({
//       aaa: [
//         ...this.state.aaa,
//         bbb
//       ]
//     });
//     this.nameRef.current.value = '';
//   }
//
//   Click(i) {
//     console.log(i)
//
//     const ccc = this.state.aaa
//     ccc.splice(i,1)
//     //delete ccc[i]
//
//     this.setState({ aaa: ccc });
//   }
//
//   render () {
//     //console.log(this.state)
//
//     return (
//       <div className="App">
//         <h1 className="App-header">
//             小肥今晚食乜女？
//         </h1>
//         <form >
//           請輸入文字：<input type = "text" name = "food" value={this.state.value} ref={this.nameRef}/>
//           <button onClick={this.handleClick}>Click Me!</button>
//         </form>
//         <ul>
//           {
//             this.state.aaa.map((item, i) => {
//               return <li key={i}><span>{item}<button onClick={(e) => { this.Click(i) }} type="submit">del</button></span></li>
//             })
//           }
//         </ul>
//
//         <ReactMapGL {...viewport}>
//         YO
//         </ReactMapGL>
//
//
//       </div>
//     );
//   }
// }

export default App;

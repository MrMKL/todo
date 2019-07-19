import React, { useState }  from 'react';
import logo from './marker-editor.svg';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "./data/skateboard-parks.json";

const fetch = require('node-fetch')

var data = {}

// fetch /aaa
fetch('https://my-react-app.jasonma0803.now.sh/aaa', {
  //mode: 'cors'
})
    .then(res => res.json())
    .then(body => {
      console.log(body)
      data = body
      console.log(data['路邊'].Stationname)
    });


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
            <h2>{data[selectedPark.properties.NAME].Stationname}</h2>
            <p>
            {data[selectedPark.properties.NAME].RecordTime}<br />
            {data[selectedPark.properties.NAME].Value}<br />
            {data[selectedPark.properties.NAME].Description}<br />
            {data[selectedPark.properties.NAME].Element}
            </p>
          </div>
        </Popup>
      ) : null}


      </ReactMapGL>
    </div>
  );
}


export default App;

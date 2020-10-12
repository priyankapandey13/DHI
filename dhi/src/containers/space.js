import React, { useState } from "react";
import "./Home.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { GeolocateControl } from "react-map-gl";
// import { Button } from "@material-ui/core";
import Mapapi from './Mapapi';

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicHJpeWFua2FwcyIsImEiOiJja2cyYzFjY3MxZTc4MnlxZm92d2Y4M3poIn0.7Eb13DlMMMXb-_UnsMgcVg";

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px",
};

// const style = {
//   padding: "10px",
//   color: "#fff",
//   cursor: "pointer",
//   background: "#1978c8",
//   borderRadius: "6px",
// };

// function fetchArray() {
//   fetch(
//     `https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:affaldskurve_puma&outputFormat=json&SRSNAME=EPSG:4326`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       getcoords(data.features);
//       return data;
//     });
// }


// fetchArray();

// function getcoords(data) {
//   const finaldata = [];
//   const data1 = data.map((item) => {
//     const data2 = item.geometry.coordinates.map((coords) => {
//       const coordsarray = coords.map((data) => {
//         finaldata.push({
//           latitude: coords[0],
//           longitude: coords[1],
//         });
//         return finaldata;
//       });

//       return coordsarray;
//     });

//     return data2;
//   });

//   return finaldata;
// }

// const mytestVar = fetchArray();
// console.log(mytestVar);

// const markers = [
//   { latitude: 0, longitude: 0 },
//   { latitude: 0.5, longitude: 0.5 },
//   { latitude: 1.5, longitude: 1.5 },
//   { latitude: 12.56810795478189, longitude: 55.68194599506729 },
//   { latitude: 10.567083630841283, longitude: 45.681152213615626 },
// ];

// function onMarkerClick(event) {
//   alert("You clicked on marker");
//   console.log("You clicked on marker");
//   event.stopPropagation();
// }

function Space() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 0,
    longitude: 0,
    zoom: 1,
    bearing: 0,
    pitch: 0,
    marker: true,
  });

  const _onViewportChange = (viewport) =>
    setViewport({ ...viewport, transitionDuration: 3000 });

  // const [position, setPosition] = useState({ longitude: 0, latitude: 0 });

  // const updatePosition = (position) =>
  //   setPosition({ ...position, transitionDuration: 3000 });

  // setPosition({...position, longitude: "userInput", latitude: "Input by user"});

  return (
    <>
      {/* <Button onClick={() => fetchArray()}>Default click</Button> */}
      {/* <Button onClick={() => this.setPosition({ ...this.position })}>Default click</Button> */}

      <div style={{ margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bolder",
          }}
        >
          GeoLocator: Click To Find Your Location or click{" "}
          <a href="/search">here</a> to search for a location
        </h1>
        <MapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v8"
          onViewportChange={_onViewportChange}
        >
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          {/* <Marker
            longitude={markers[0].longitude}
            latitude={markers[0].latitude}
            onClick={onMarkerClick}
            // onDragEnd={onDragEnd}
            draggable
          >
            <div style={style}>
              hi
              {/* <span>🗑️</span> */}
          {/* </div>
          </Marker> */}

           <Mapapi/>
        </MapGL>
        {/* {markers.map(marker => (
          <div>{marker}</div>
        ))} */}
      </div>
    </>
  );
}

export default Space;

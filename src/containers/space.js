// import React, { useState, useContext, useCallback } from "react";
import React, { useState } from "react";
import "./Home.css";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapGL, {Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import MapGL, {Marker, NavigationControl, Popup } from "react-map-gl";
import CityInfo from './city-info';
import CITIES from './cities.json';

import Pin from './pins';
// import PoolSharpIcon from "@material-ui/icons/PoolSharp";
// import { Link } from "react-router-dom";
// import { GlobalStateContextLati, GlobalStateContextLongi, GlobalStatePosition } from "./Home";



// const geolocateStyle = {};
// const style = {};
const navStyle = {
  // position: 'absolute',
  // top: 0,
  // left: 0,
  // padding: '10px'
};

function Space(props) {

  // const [CurrentGraphInputLati, SetCurrentGraphInputLati] = useContext(
  //   GlobalStateContextLati
  // );

  // const [CurrentGraphInputLongi, SetCurrentGraphInputLongi] = useContext(
  //   GlobalStateContextLongi
  // );
  // const {apiURL, MAPBOX_TOKEN} = props
  const {MAPBOX_TOKEN, Position} = props;
  // console.log(MAPBOX_TOKEN);
  // console.log(Position); // Position has only array of one coordinate lati ang longi
// console.log(Location); // Location has full array of 23 objects with all the information
  const PositionArray =[];
  Position.map(items => items.forEach(element => PositionArray.push(element)));
// console.log(PositionArray);

  // const [Position, SetPosition] = useContext(
  //   GlobalStatePosition
  // );

  // const {data, onClick} = props;
  // data will contain lati ang longi of the location
  // onclick event

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 55.676098,
    longitude: 12.568337,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    marker: true,
  });

  const [popupInfo, setPopupInfo] = useState(null);
console.log(popupInfo);
  // const [position, setPosition] = useState([]);
  // const [Location, setLocation] = useState([]);
  

  // const [marker, setMarker] = useState({
  //   latitude: 40,
  //   longitude: -100
  // });


  const _onViewportChange = (viewport) =>
  setViewport({ ...viewport, transitionDuration: 3000 });


  // const [events, logEvents] = useState({});

  // const onMarkerDragStart = useCallback(event => {
  //   logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  // }, []);

  // const onMarkerDrag = useCallback(event => {
  //   logEvents(_events => ({..._events, onDrag: event.lngLat}));
  // }, []);

  // const onMarkerDragEnd = useCallback(event => {
  //   logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
  //   setMarker({
  //     longitude: event.lngLat[0],
  //     latitude: event.lngLat[1]
  //   });
  // }, []);



const testvalue = PositionArray.map((coordinates, index) =>{
  return coordinates;
})

  return (
    <div>
      {/* <input type="text" onChange={testfunction} value=" " /> */}


      <MapGL
        {...viewport}
        // width="1000%"
        // height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v8"
        onViewportChange={_onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >

 {testvalue.map((coordinates, index) =>

          <Marker
          key={index}
           longitude={coordinates[0]}
           latitude={coordinates[1]}
           offsetTop={-20}
           offsetLeft={-10}
          //  draggable
          //  onDragStart={onMarkerDragStart}
          //  onDrag={onMarkerDrag}
          //  onDragEnd={onMarkerDragEnd}
         >
           {/* <Pin size={20} /> */}
           <Pin size={20} data={CITIES} onClick={setPopupInfo} />

        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <CityInfo info={popupInfo} />
          </Popup>
        )}
         </Marker>

   )}




        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </MapGL>
      {/* <ControlPanel events={events} /> */}



    </div>
  );
}

export default Space;

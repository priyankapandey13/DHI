import React, { useState } from "react";
import "./Home.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import { Button } from "@material-ui/core";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicHJpeWFua2FwcyIsImEiOiJja2cyYzFjY3MxZTc4MnlxZm92d2Y4M3poIn0.7Eb13DlMMMXb-_UnsMgcVg";

function fetchArray() {
  // https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:cykeldata_kk&outputFormat=json&SRSNAME=EPSG:4326
  fetch(
    `https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:affaldskurve_puma&outputFormat=json&SRSNAME=EPSG:4326`
  )
    .then((response) => response.json())
    .then((data) => {
      getcoords(data.features);
      return data;
    });
}

function getcoords(data) {
  data.map((item) => {
    item.geometry.coordinates.map((coords) => {
      for (let i = 0; i < coords.length; i++) {
        const element = coords;
        console.log(element);
      }
      return coords;
    });
    return item;
  });
}

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px",
};

function onMarkerClick(event) {
  alert("You clicked on marker");
  console.log("You clicked on marker");
  event.stopPropagation();
}

function Space() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 0,
    longitude: 0,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    marker: true,
  });

  const [position, setPosition] = useState({
    longitude: 0,
    latitude: 0,
  });

  const style = {
    padding: "10px",
    color: "#fff",
    cursor: "pointer",
    background: "#1978c8",
    borderRadius: "6px",
  };

  const _onViewportChange = (viewport) =>
    setViewport({ ...viewport, transitionDuration: 3000 });

  return (
    <>
      <Button onClick={() => fetchArray()}>Default click</Button>

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
          <Marker
            longitude={position.longitude}
            latitude={position.latitude}
            onClick={onMarkerClick}
            // onDragEnd={onDragEnd}
            draggable
          >
            <div style={style}>
              <span>🗑️</span>
            </div>
          </Marker>
        </MapGL>
      </div>
    </>
  );
}

export default Space;

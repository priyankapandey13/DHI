import React, { useState, useEffect } from "react";
import "./Home.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { GeolocateControl } from "react-map-gl";
import { Marker } from "react-map-gl";
import PoolSharpIcon from "@material-ui/icons/PoolSharp";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicHJpeWFua2FwcyIsImEiOiJja2cyYzFjY3MxZTc4MnlxZm92d2Y4M3poIn0.7Eb13DlMMMXb-_UnsMgcVg";

const apiURL =
  "https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:svoemmehaller_mv&outputFormat=json&SRSNAME=EPSG:4326";

const style = {};

const markers = [];

const geolocateStyle = {};

function Space() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 55.676098,
    longitude: 12.568337,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    marker: true,
  });

  const _onViewportChange = (viewport) =>
    setViewport({ ...viewport, transitionDuration: 3000 });

  const [position, setPosition] = useState({});

  async function fetchData() {
    const response = await fetch(apiURL);
    response
      .json()
      .then((response) => {
        const data = response.features;
        const data1 = data.map((item) => {
          const data2 = item.geometry.coordinates.map((coords) => {
            const coordsarray = coords.map((data) => {
              markers.push({
                latitude: coords[1],
                longitude: coords[0],
              });

              return markers;
            });
            return coordsarray;
          });

          return data2;
        });
        setPosition(markers);
        return data1;
      })

      .catch((err) => alert(err));
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <>
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
          {markers.map((location, index) => (
            <Marker
              latitude={location.latitude}
              longitude={location.longitude}
              key={index}
              draggable
            >
              <div style={style}>
                <PoolSharpIcon />
              </div>
            </Marker>
          ))}
        </MapGL>
      </div>
    </>
  );
}

export default Space;

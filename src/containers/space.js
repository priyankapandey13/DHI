import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import PoolSharpIcon from "@material-ui/icons/PoolSharp";
import { Link } from "react-router-dom";
import { GlobalStateContextLati, GlobalStateContextLongi } from "./Home";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicHJpeWFua2FwcyIsImEiOiJja2cyYzFjY3MxZTc4MnlxZm92d2Y4M3poIn0.7Eb13DlMMMXb-_UnsMgcVg";

const apiURL =
  "https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:svoemmehaller_mv&outputFormat=json&SRSNAME=EPSG:4326";

const style = {};

const geolocateStyle = {};

function Space() {
  // eslint-disable-next-line
  const [CurrentGraphInputLati, SetCurrentGraphInputLati] = useContext(
    GlobalStateContextLati
  );
  // eslint-disable-next-line
  const [CurrentGraphInputLongi, SetCurrentGraphInputLongi] = useContext(
    GlobalStateContextLongi
  );

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

  const [position, setPosition] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(apiURL);
      const json = await response.json();
      const markers = [];

      const data = json.features;
      const data1 = data.map((item) => {
        const data2 = item.geometry.coordinates.map((coords) => {
          const coordsarray = coords.map((data, index) => {
            markers.push({
              latitude: coords[1],
              longitude: coords[0],
              key: index,
            });

            return markers;
          });
          return coordsarray;
        });

        return data2;
      });
      setPosition(markers);
      return data1;
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="showcoordinates">
        {position.map((location, index) => (
          <Link
            to="/time"
            key={index}
            onClick={() => {
              SetCurrentGraphInputLati(location.latitude);
              SetCurrentGraphInputLongi(location.longitude);
            }}
          >
            {/* lati : <span>{location.latitude}</span>,<br/> longi : <span>{location.longitude}</span> */}
            Location: {index + 1}
          </Link>
        ))}
      </div>
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

        {position &&
          position.map((location, index) => (
            
              <Marker
                latitude={location.latitude}
                longitude={location.longitude}
                key={index}
                draggable
              >
                <div style={style} id="testbox">
                  <PoolSharpIcon />
                </div>
              </Marker>
            
          ))}
      </MapGL>
    </div>
  );
}

export default Space;

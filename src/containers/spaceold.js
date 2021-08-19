import React, { useState, useEffect} from "react";
import "./Home.css";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import MapGL, { GeolocateControl } from "react-map-gl";
// import Pins from './pins';
// import PoolSharpIcon from "@material-ui/icons/PoolSharp";
// import { Link } from "react-router-dom";
// import { GlobalStateContextLati, GlobalStateContextLongi } from "./Home";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicHJpeWFua2FwcyIsImEiOiJja2cyYzFjY3MxZTc4MnlxZm92d2Y4M3poIn0.7Eb13DlMMMXb-_UnsMgcVg";

const apiURL =
  "https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:svoemmehaller_mv&outputFormat=json&SRSNAME=EPSG:4326";

const style = {};
// const CITIES = [
//   {"city":"New York","population":"8,175,133","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg","state":"New York","latitude":40.6643,"longitude":-73.9385},
//   {"city":"Los Angeles","population":"3,792,621","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg","state":"California","latitude":34.0194,"longitude":-118.4108},
//   {"city":"Chicago","population":"2,695,598","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2008-06-10_3000x1000_chicago_skyline.jpg/240px-2008-06-10_3000x1000_chicago_skyline.jpg","state":"Illinois","latitude":41.8376,"longitude":-87.6818},
//   {"city":"Houston","population":"2,100,263","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg/240px-Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg","state":"Texas","latitude":29.7805,"longitude":-95.3863},
//   {"city":"Phoenix","population":"1,445,632","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Downtown_Phoenix_Aerial_Looking_Northeast.jpg/207px-Downtown_Phoenix_Aerial_Looking_Northeast.jpg","state":"Arizona","latitude":33.5722,"longitude":-112.0880},
//   {"city":"Philadelphia","population":"1,526,006","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Philly_skyline.jpg/240px-Philly_skyline.jpg","state":"Pennsylvania","latitude":40.0094,"longitude":-75.1333},
// ]

const geolocateStyle = {};

function Space(props) {
  
  // const [CurrentGraphInputLati, SetCurrentGraphInputLati] = useContext(
  //   GlobalStateContextLati
  // );
  // // eslint-disable-next-line
  // const [CurrentGraphInputLongi, SetCurrentGraphInputLongi] = useContext(
  //   GlobalStateContextLongi
  // );

  const {data, onClick} = props;
  // data will contain lati ang longi of the location 
  // onclick event
  
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
  // const [popupInfo, setPopupInfo] = useState(null);
  console.log(position);
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

        
      </MapGL>
    </div>
  );
}

export default Space;

import React, { useState } from "react";
import "./Home.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Marker } from "react-map-gl";
// import { Button } from "@material-ui/core";


const style = {
    padding: "10px",
    color: "#fff",
    cursor: "pointer",
    background: "#1978c8",
    borderRadius: "6px",
  };


function fetchArray() {
  fetch(
    `https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:affaldskurve_puma&outputFormat=json&SRSNAME=EPSG:4326`
  )
    .then((response) => response.json())
    .then((data) => {
      getcoords(data.features);
    // const data = apidata.features;
    // const finaldata=[];
    // const data1 = data.map((item) => {
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
    //   console.log(data);
      return data;
    });
}


function getcoords(data) {
  const finaldata = [];
  const data1 = data.map((item) => {
    const data2 = item.geometry.coordinates.map((coords) => {
      const coordsarray = coords.map((data) => {
        finaldata.push({
          latitude: coords[0],
          longitude: coords[1],
        });
        return finaldata;
      });

      return coordsarray;
    });

    return data2;
  });

  return finaldata;
}

// const mytestVar = fetchArray();
// console.log(mytestVar);

const markers = [
  { latitude: 0, longitude: 0 },
  { latitude: 0.5, longitude: 0.5 },
  { latitude: 1.5, longitude: 1.5 },
  { latitude: 12.56810795478189, longitude: 55.68194599506729 },
  { latitude: 10.567083630841283, longitude: 45.681152213615626 },
];

// function Mapapi() {
class Mapapi extends React.Component{

    state = {
        latitude: 0,
        longitude: 0,
      }

      fetchlist=(event) => {    
        fetchArray(event).then(data => {     
          this.setState({ latitude: data.latitude, longitude: data.latitude})
          console.log(this.latitude);
        }).catch((error) => {
          if(error){
          alert(`This Process Failed : ${error}`);
          return
          }
        })
      }

     

//   const [position, setPosition] = useState({ longitude: 0, latitude: 0 });
  render(){
  return (
    <>
          {markers.map((marker) => (
            <Marker latitude={marker.latitude} longitude={marker.longitude}>
              <div style={style}>
                hi
                {/* <span>🗑️</span> */}
              </div>
            </Marker>
          ))}
    </>
  );
}
}

export default Mapapi;

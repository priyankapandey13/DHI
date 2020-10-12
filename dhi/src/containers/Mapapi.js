import React, { useState, useEffect } from "react";
import "./Home.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Marker } from "react-map-gl";
// import axios from "axios";
// import { Button } from "@material-ui/core";

const style = {
  padding: "10px",
  color: "#fff",
  cursor: "pointer",
  background: "#1978c8",
  borderRadius: "6px",
};

// function fetchArray() {
//   fetch(
//     `https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:affaldskurve_puma&outputFormat=json&SRSNAME=EPSG:4326`
//   )
//     .then((response) => response.json())
//     .then((apidata) => {
//     //   getcoords(data.features);
//     const data = apidata.features;
//     const finaldata=[];
//     const data1 = data.map((item) => {
//         const data2 = item.geometry.coordinates.map((coords) => {
//           const coordsarray = coords.map((data) => {
//             finaldata.push({
//               latitude: coords[0],
//               longitude: coords[1],
//             });
//             // const testing = (data) => setState({ latitude: coords[0], longitude: coords[1], })
//             return finaldata;
//           });

//           return coordsarray;
//         });

//         return data2;
//       });
//       console.log(data);
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

const markers = [
  { latitude: 0, longitude: 0 },
  { latitude: 0.5, longitude: 0.5 },
  { latitude: 1.5, longitude: 1.5 },
  { latitude: 12.56810795478189, longitude: 55.68194599506729 },
  { latitude: 10.567083630841283, longitude: 45.681152213615626 },
];

function Mapapi() {


  // const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [position, setPosition] = useState({latitude: 0, longitude: 0});


  const apiURL =
    "https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:affaldskurve_puma&outputFormat=json&SRSNAME=EPSG:4326";

  // const fetchData = async () => {
  //   const response = await axios.get(apiURL);
async function fetchData(){
  const response = await fetch(apiURL);
  response.json()
  .then(response => {
    
    // console.log(response);
    const data = response.features;
      
    const finaldata=[];
    const data1 = data.map((item) => {
        const data2 = item.geometry.coordinates.map((coords) => {
          // const coordsarray = coords.map((data) => {
            // finaldata.push({
            //   latitude: coords[0],
            //   longitude: coords[1],
            // });
            finaldata.push({
                latitude: coords[0],
                longitude: coords[1],
              });
            // console.log(
            //   `latitude: ${coords[0]},
            //   longitude: ${coords[1]},`
            //   );
            return finaldata;
          // });
          // return coordsarray;
        });

        return data2;
      });
// console.log(finaldata);
setPosition(finaldata);

  })
  
  .catch(err => alert(err));
  }


  useEffect(() => {
    fetchData();
  });

  // console.log(position);
    
  //     const data = response.data.features;
      
  //     const finaldata=[];
  //     const data1 = data.map((item) => {
  //         const data2 = item.geometry.coordinates.map((coords) => {
  //           const coordsarray = coords.map((data) => {
  //             finaldata.push({
  //               latitude: coords[0],
  //               longitude: coords[1],
  //             });

  //             // setPosition(...position, {latitude: coords[0], longitude: coords[1]}) 
  //             // setPosition({...position, latitude: coords[0], longitude: coords[1]}) 
  //             // setPosition({position: [...position, {latitude: coords[0], longitude: coords[1]}]}) 
              
              
  //             return finaldata;
  //           });
  
  //           return coordsarray;
  //         });
  
  //         return data2;
  //       });

  //       // console.log(data);
  //       // setPosition(data) 
  //       return data;
      

  // };

  
  // fetchData();
// console.log(position);


  //   const testdiv = fetchArray();
  //   console.log(testdiv);

  // const onDragEnd = (lngLat) => {
  //   setPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
  // };

  return (
<>
    {markers.map((location) => (
        <Marker
        latitude={location.latitude}
        longitude={location.longitude}
        // onDragEnd={onDragEnd}
        draggable
      >
        <div style={style}>Hi there!</div>
      </Marker>
      // , console.log(position)
    ))
    
  }
  </>
  );
  
}

export default Mapapi;

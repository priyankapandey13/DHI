import React, { useState, useEffect } from "react";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
// import Space from "./space";
import Main from "./main";
import Time from "./time";
import { Container, Box } from "@material-ui/core";



const apiURL =
  "https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:svoemmehaller_mv&outputFormat=json&SRSNAME=EPSG:4326";

// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoicHJpeWFua2FwcyIsImEiOiJja2cyYzFjY3MxZTc4MnlxZm92d2Y4M3poIn0.7Eb13DlMMMXb-_UnsMgcVg";

function FetchArray(event) {
  const URL = apiURL;
  return fetch(URL)
  .then((response) => response.json())
  .then((data) => data.features);
}

// function handlechildclick(props) {
//   // setColor(color);
  
//   alert(props);
// //  alert(`handlechildclick is called ${popupInfo.latitude} + ${popupInfo.longitude}`);
 
// }

function Home() {
  
  // const [Location, SetLocation] = useState([]);
  // const [CurrentLoc, SetCurrentLoc] = useState('Less test');

  const [CurrentLocationfromchild, SetCurrentLocationfromchild] = useState();
  // const [isParentData, setIsParentData] = useState('true');

  // console.log(CurrentLocation);
 const [Position, SetPosition] = useState([]);
  // const [CurrentGraphInputLati, SetCurrentGraphInputLati] = useState([55.676098, 12.568337]);
  
  const fetchlist = async (event) => {
    try {
      const data = await FetchArray(event);
      // SetLocation(data);
      // console.log(data);
      const cordiValue = data.map(loca => {
        const poolinfo = loca.properties;
      const temparray = loca.geometry.coordinates[0];
      return {latitude : temparray[1], longitude : temparray[0], PoolInfo : poolinfo}
      // return (`Latitude : ${temparray[0]}, Longitude : ${temparray[1]}`)
      });
      SetPosition(cordiValue)
      
    }
    catch(error){      
        alert(error);
      }
    }


 useEffect(() => {
   fetchlist();
 }, []);

//  {Location.map((items) => (
//     `<div>${items.id}</div>`
//   ))
 
// }

  return (
    <>
    <Header />
    <Box
        maxWidth="xl"
        className="contentcontainer MuiPaper-elevation10"
        elevation={5}
      >
        <Container maxWidth="xl" className="">
          <h2>Welcome To Swimming Pool App</h2>
          <Box>
            <h3>Find near by swimming pools </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            </p>
            <p>
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            {/* <p>Hi + {CurrentLoc} + {CurrentLocationfromchild}</p>
            <button onClick={()=>{SetCurrentLoc(CurrentLoc==='Less test' ? 'I am gonna test more' : 'Less test')}}>
         View chart
        </button>
        <p>is this a parent data?: {isParentData}</p>
     */}
          </Box>
          <Box>
{/* <Space Position={Position} MAPBOX_TOKEN={MAPBOX_TOKEN}  />  */}
{/* Location={Location} Location has full value of 23 locations not needed right now */}
{/* <Space data={CurrentGraphInputLati} onChildClick={handleChildClick} Position={Position} /> */}


<Router>
                  <div className="routerlinks">
                    <Link to="/" active="true" >Pools</Link>
                    <Link to="/time">Weather</Link>
                  </div>
                  <div className="routercontainer">
                    <Switch>
                      <Route path="/Time">
                        <Time CurrentLocationfromchild={CurrentLocationfromchild}/>
                      </Route>
                      <Route path="/">
<Main Position={Position} 
handlechildclick={SetCurrentLocationfromchild}
// toChild={isParentData} sendToParent={setIsParentData}
/> 
                        
                      </Route>
                    </Switch>
                  </div>
                </Router>
</Box>
    </Container>
</Box>
    </>
  );
}
export default Home;

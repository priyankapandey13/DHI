import React, { useState, useEffect } from "react";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Header from "./Header";
// import CarouselShow from "./CarouselShow";
import { Container, Box } from "@material-ui/core";
import Space from "./spaceold";
// import Time from "./time";

// export const GlobalStateContextLati = React.createContext(0);
// export const GlobalStateContextLongi = React.createContext(0);
export const GlobalStatePosition = React.createContext(0);


// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoicHJpeWFua2FwcyIsImEiOiJja2cyYzFjY3MxZTc4MnlxZm92d2Y4M3poIn0.7Eb13DlMMMXb-_UnsMgcVg";

const apiURL =
  "https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:svoemmehaller_mv&outputFormat=json&SRSNAME=EPSG:4326";








function Home() {
  const [Location, SetLocation] = useState([]);
  console.log('Hello world after' );
   const [Position, SetPosition] = useState(0);

  const CurrentGraphInputLati = [55.676098, 12.568337];
  
  // const [CurrentGraphInputLati, SetCurrentGraphInputLati] = useState(0);
  // const [CurrentGraphInputLongi, SetCurrentGraphInputLongi] = useState(0);


  // const [popupInfo, setPopupInfo] = useState(null);
// console.log(CurrentGraphInputLati);
// console.log(CurrentGraphInputLongi);
// console.log(popupInfo);


// Testing for callback child to parent
// const [color, setColor] = useState('');
// function handleChildClick(color) {
//   setColor(color);
// }

const fetchData = async () => {
  try {

    const response = await fetch(apiURL);
  const json = await response.json();
    const data = json.features;
    SetLocation(data)
    // console.log(data)
    console.log(Location)
  
}catch(err){
  alert(err);
}
}


// async function fetchData() {
//   const locationdetails = [];
//   try {
//     const response = await fetch(apiURL);
//     const json = await response.json();
//     const data = json.features;
//     data.map(item => {
      
//       locationdetails.push(item)
      
//       return locationdetails;
//     });
    
//     setLocation(locationdetails);

//     // console.log(data1);
//     // setPosition(markers);
//     return data;
//     // return pinlocationdata
//   } catch (err) {
//      alert(err);
//   }
//   // console.log(locationdetails);
// }
// console.log(Location);



// =====================================================




        
        // (!Location) ? console.log('wait for Location') : console.log(Location);
 





useEffect(() => {
  fetchData();
// setLocation(locationdetails);
}, []);




  return (
    <div>
      {/* <Header /> */}
      {/* <CarouselShow /> */}
      <Box
        maxWidth="xl"
        className="contentcontainer MuiPaper-elevation10"
        elevation={5}
      >
        <Container maxWidth="xl" className="">
          <h2>Welcome To DHI</h2>
          <Box>
            <h3>Explore the power of data </h3>
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
          </Box>
          <Box>
            {/* <GlobalStatePosition.Provider
              value={[Position, SetPosition]}
            > */}
            {/* <GlobalStateContextLati.Provider
              value={[CurrentGraphInputLati, SetCurrentGraphInputLati]}
            >
              <GlobalStateContextLongi.Provider
                value={[CurrentGraphInputLongi, SetCurrentGraphInputLongi]}
              > */}
                <Router>
                  <div className="routerlinks">
                    <Link to="/">Space</Link>
                    {/* <Link to="/time">Time</Link> */}
                  </div>
                  <div className="routercontainer">
                    <Switch>
                      {/* <Route path="/Time">
                        <Time />
                      </Route> */}
                      <Route path="/">
                        
                        {/* <Space data={CurrentGraphInputLati} onClick={setPopupInfo} /> */}
                         {/* <Space data={CurrentGraphInputLati} onChildClick={handleChildClick} Position={Position} /> */}
                         <Space data={CurrentGraphInputLati} Position={Position} />
        
                        {/* <Space onChildClick={handleChildClick} Position={Position} MAPBOX_TOKEN={MAPBOX_TOKEN} 
                        apiURL={apiURL} Location={Location} /> */}
                        {/* <Space data={CurrentGraphInputLati} onChildClick={handleChildClick} Position={Position} /> */}
      
                        
                      </Route>
                    </Switch>
                  </div>
                </Router>
              {/* </GlobalStateContextLongi.Provider>
            </GlobalStateContextLati.Provider> */}
            {/* </GlobalStatePosition.Provider> */}
          </Box>
        </Container>
      </Box>
    </div>
  );
}
export default Home;

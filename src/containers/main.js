import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL, {
  Popup,
} from 'react-map-gl';
import { Redirect } from "react-router-dom";
// import ControlPanel from './control-panel';

import Pins from './pins';
import CityInfo from './city-info';

const TOKEN = 'pk.eyJ1IjoicHJpeWFua2FwcyIsImEiOiJja2cyYzFjY3MxZTc4MnlxZm92d2Y4M3poIn0.7Eb13DlMMMXb-_UnsMgcVg'; 

export default function App(props) {
  
    const [viewport, setViewport] = useState({
      // width: "100%",
      // height: 400,
      latitude: 55.676098,
      longitude: 12.568337,
      zoom: 11,
      bearing: 0,
      pitch: 0,
      // marker: true,
      // latitude: 40,
      // longitude: -100,
      // zoom: 3.5,
      // bearing: 0,
      // pitch: 0
    });
  const [popupInfo, setPopupInfo] = useState(null);
  // const [popupInfo, setPopupInfo] = useState(props.Position[0]);
  // console.log(popupInfo);
  // function handlechildclick() {
  //   // setColor(color);
  //  alert(`handlechildclick is called ${popupInfo.latitude} + ${popupInfo.longitude}`);
   
  // }
  // console.log(popupInfo);
  // console.log(props.Position[0]);

  return (
     <div>
       {/* <button onClick={() => {props.sendToParent('false')}}>Update</button>
    <p>The state of isParentData is {props.toChild}</p> */}
    
       {/* <button onClick={() => {props.handlechildclick(popupInfo.longitude)}}>Get Updated location</button> */}
    
     {/* style={{
         width:'100%',
         height: '100%',
         transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
       }}
     >  */}
      <MapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}
      >
        
        <Pins data={props.Position} onClick={setPopupInfo} />
        

         {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
           
          >
            <CityInfo info={popupInfo} 
            //  SetCurrentLocationfromchild={props.handlechildclick}
            onClick={() => {
              props.handlechildclick([popupInfo.latitude , popupInfo.longitude])
            }}

              />
          </Popup>
        )}       
      </MapGL>
     {/* <ControlPanel />  */}
     </div> 
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
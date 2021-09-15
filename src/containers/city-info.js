import * as React from 'react';
import { Link } from "react-router-dom";
// import { Redirect, Link } from "react-router-dom";

function CityInfo(props) {
  const {info} = props;
  // const displayName = `${info.city}, ${info.state}`;
  const displayName = `${info.PoolInfo.navn}`;
//   adresse: "Amager Strand Promenaden 1"
// e_mail: "asp@teambade.dk"
// ​id: 18
// ​​​kategori: "Badestrand"
// link: "https://svoemkbh.kk.dk/amager-strandpark"
// post_nr: 2300
 


  return (
    <div>
      <div>
        <h3>{displayName}</h3>
        
        {/* <a
          target="_new"
          href={info.PoolInfo.link}
        >
         Visit Website
        </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        {/* <a
          target="_new"
          href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
        >
          Wikipedia
        </a> */}
      </div>
      <div>{info.PoolInfo.postdistrikt} || {info.PoolInfo.kategori}</div>

      <div>
          {info.PoolInfo.e_mail} || {info.PoolInfo.post_nr}
      </div>
      <div>
        {info.PoolInfo.adresse}
      </div>
      
      <div>
      <a target="_new" href={info.PoolInfo.link}> Visit Website</a> || <Link to="/time" onClick={props.onClick} >See Graph</Link>
      </div>
      {/* <div>
        {info.latitude}
        || {info.longitude}
      </div> */}

      {/* <img width={240} src={info.image} alt="icon" /> */}
    </div>
  );
}

export default React.memo(CityInfo);
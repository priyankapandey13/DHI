import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel, Thumbs } from 'react-responsive-carousel';
import { Box, Container, Grid } from "@material-ui/core";
import DhiTitle from "../assets/dhi-gras.png";
import Location from "../assets/location.png";
import Scholar from "../assets/scholar.png";
import Diamond from "../assets/diamond.png";

export default function Slider () {
    




    return(
        <Grid
        container
    //     direction="row"
    //     justify="center"
    //     alignItems="center"
       className="slidercontainer"
    >
{/* <Box class="sliderbox "> */}
<Grid item xs={2} spacing={8}>&nbsp;</Grid>
<Grid item xs={3} ><img alt="Dhi Title" src={DhiTitle} /></Grid>
<Grid item xs={2} >&nbsp;</Grid>
<Grid item xs={4} spacing={8}>
    <Carousel autoPlay={true}
    showArrows={false}
    showThumbs={false}
    showIndicators={false}
    showStatus={false}
    stopOnHover={false}
    swipeable={true}
    infiniteLoop={true}
     >
      <div>
        <img alt="location icon" src={Location} />
        
      </div>
      <div>
        <img alt="scholar icon" src={Scholar} />
        
      </div>
      <div>
        <img alt="diamond icon" src={Diamond} />
        
      </div>
    </Carousel>
    
    </Grid>
    <Grid item xs={1} >&nbsp;</Grid>
  </Grid>

 
    );
}
    
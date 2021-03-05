import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Container, Grid } from "@material-ui/core";
import DhiTitle from "../assets/dhi-gras.png";
import Location from "../assets/location.png";
import Scholar from "../assets/scholar.png";
import Diamond from "../assets/diamond.png";

export default function Slider() {
  return (
    <div maxWidth="lg" className="slidercontainer">
      <Container>
      <Grid container>
      <Grid component="div" xl={6} md={6} sm={6} xs={12}>
        <img alt="Dhi Title" src={DhiTitle} className="SliderHeading" />
      </Grid>
      <Grid component="div" xl={6} md={6} sm={6} xs={12}>
      <Carousel
          autoPlay={true}
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
      </Grid>
      </Container>
      </div>

  );
}

import React from "react";
import { Carousel } from "react-bootstrap";
import banner1 from "../../../img/img/Product/Banner/banner1.jpg";
import banner2 from "../../../img/img/Product/Banner/banner2.jpg";
import banner3 from "../../../img/img/Product/Banner/banner.3.jpg";
// import banner4 from '../../../img/img/Product/Banner/'
const Banner = () => {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>

            <img className="d-block w-100" src={banner1} alt="First slide" />
            <Carousel.Caption className="text-success">
              <h3>Buy Fresh , Eat Fresh</h3>
              <p className="fs-5">
                We value our customer as well as product to stay healthy
              </p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="Third slide" />

          <Carousel.Caption className="text-success">
            <h3>Eat healthy live Healthy</h3>
            <p className="fs-5">
              We value our customer and ensure our product quality product to
              stay healthy
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;

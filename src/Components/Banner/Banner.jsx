import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/banner no 01.png";
import banner2 from "../../assets/banner no 02.png";
import banner3 from "../../assets/banner no 03.png";

const Banner = () => {
  return (
    <Carousel
      autoFocus={true}
      autoPlay={true}
      showThumbs={false}
      infiniteLoop={true}
      interval={3000}
      showStatus={false}
    >
      <div>
        <img
          src={banner1}
          alt="Banner 1"
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] 2xl:h-[700px] object-cover rounded-2xl"
        />
      </div>
      <div>
        <img
          src={banner2}
          alt="Banner 2"
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] 2xl:h-[700px] object-cover rounded-2xl"
        />
      </div>
      <div>
        <img
          src={banner3}
          alt="Banner 3"
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] 2xl:h-[700px] object-cover rounded-2xl"
        />
      </div>
    </Carousel>
  );
};

export default Banner;

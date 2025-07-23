import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from "../assets/slider1.jpg";
import slide2 from "../assets/slider2.jpg";
import slide3 from "../assets/slider3.jpg";

const Slider = () => {
    return (
        <div className="w-full">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                className="rounded-none"
            >
                <div>
                    <img
                        src={slide1}
                        alt="Slide 1"
                        className="w-full h-[400px] object-cover"
                    />
                </div>
                <div>
                    <img
                        src={slide2}
                        alt="Slide 2"
                        className="w-full h-[400px] object-cover"
                    />
                </div>
                <div>
                    <img
                        src={slide3}
                        alt="Slide 3"
                        className="w-full h-[400px] object-cover"
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;



import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = ({ testimonials, maxTestimonials }) => {
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  };


  const limitedTestimonials = testimonials.slice(0, maxTestimonials);

  return (
    <div className="quotes-wrapper">
      {limitedTestimonials.length > 1 ? (
        <Slider {...settings}>
          {limitedTestimonials.map((testimonial) => (
            <blockquote key={v4()} className="message" style={{ maxWidth: "500px" }}>
              <span id="symbol">“</span>
              <div className="quotes" id="quote">
                {testimonial.quote}
              </div>
              <hr />
              <div id="name">
                <cite> – {testimonial.author}</cite>
              </div>
            </blockquote>
          ))}
        </Slider>
      ) : (
        limitedTestimonials.map((testimonial) => (
          <blockquote key={v4()} className="message" style={{ maxWidth: "500px" }}>
            <span id="symbol">“</span>
            <div className="quotes" id="quote">
              {testimonial.quote}
            </div>
            <hr />
            <div id="name">
              <cite> – {testimonial.author}</cite>
            </div>
          </blockquote>
        ))
      )}
    </div>
  );
};

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
    })
  ),
  maxTestimonials: PropTypes.number,
};

Testimonials.defaultProps = {
  maxTestimonials: 6,
};

export default Testimonials;

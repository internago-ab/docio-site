import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

import "./hero.css"
import arrow from '../images/icons/arrow-svg.svg'

export default function FullWidthImage(props) {
  const {
    height = 800,
    img,
    title,
    subheading,
    heading,
    href,
    imgPosition = "top left",
  } = props;

  return (
    <React.Fragment>
      <div className={`hero`}>
      <div
        className={`bg-img ${props.size}`}
        style={{
          display: "grid",
          alignItems: "center",
        }}
      >
        {img?.url ? (
          <img
            src={img}
            objectFit={"cover"}
            objectPosition={imgPosition}
            style={{
              gridArea: "1/1",
              // You can set a maximum height for the image, if you wish.
              height: height,
              width: "100%",
            }}
            // This is a presentational image, so the alt should be an empty string
            alt=""
          />
        ) : (
          <GatsbyImage
            image={img}
            objectFit={"cover"}
            objectPosition={imgPosition}
            style={{
              gridArea: "1/1",
              maxHeight: height,
            }}
            layout="fullWidth"
            // You can optionally force an aspect ratio for the generated image
            aspectratio={3 / 1}
            // This is a presentational image, so the alt should be an empty string
            alt=""
            formats={["auto", "webp", "avif"]}
          />
        )}
        {(title || subheading) && (
          <div
            className="medium hero-content"
            style={{
              gridArea: "1/1",
              display: "grid",
            }}
          >
            <p>{heading}</p>
            {title && (
                <h1 className="heading" dangerouslySetInnerHTML={{ __html: title }}></h1>
            )}
            {subheading && (
            <p className="paragraph" dangerouslySetInnerHTML={{ __html: subheading }}></p>
            )}
            <div className="link-arrow">
                   <a href={href}>See all powerful features<img alt="arrow icon" src={arrow}/></a>
               </div>
          </div>
        )}
      </div>
      </div>
    </React.Fragment>
  );
}

FullWidthImage.propTypes = {
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  height: PropTypes.number,
  subheading: PropTypes.string,
  href: PropTypes.string,
};

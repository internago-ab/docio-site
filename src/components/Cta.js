import React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import arrow from "../images/icons/arrow-svg.svg";

import "../components/cta.css";

const Cta = ({ cta }) => {
  // Ensure that the imageInfo includes all necessary data and fallbacks
  const imageInfo = cta.image ? {
    image: '',
    alt: cta.image.alt || "Default alt text",
    ...cta.image, // Spread the cta.image object to capture both childImageSharp and any other structure it might have
  } : null;

  return (
      <div className="qa-wrapper">
        <div className="qa-content">
          <h2>{cta.header}</h2>
          <p className="paragraph" dangerouslySetInnerHTML={{ __html: cta.text }}></p>
          <div className="link-arrow">
            {cta.button && (
              <a href={cta.link}>
                {cta.button} <img alt="Arrow icon" src={arrow} />
              </a>
            )}
          </div>
        </div>
        {imageInfo && (
          <div className="qa-img">
            <PreviewCompatibleImage imageInfo={imageInfo} />
          </div>
        )}
      </div>
  );
};

Cta.propTypes = {
  cta: PropTypes.shape({
    image: PropTypes.object,
    header: PropTypes.string,
    text: PropTypes.string,
    button: PropTypes.string,
    link: PropTypes.string,
  }),
};

export default Cta;

import React from "react";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import arrow from "../images/icons/arrow-black.svg";
import PropTypes from "prop-types";

import "./text-image.css";

const TextImage = (mainpitch) => {

  const imageInfo = {
    image: mainpitch.mainpitch.image,
    alt: `Image for ${mainpitch.mainpitch.title}`, // Provide a meaningful alt text
  };
  return (
    <section className="section">
      <div className={`imagetext`}>
        <div className="imagetext-content">
          <h2>{mainpitch.mainpitch.title}</h2>
          <p
            className="paragraph"
            dangerouslySetInnerHTML={{
              __html: mainpitch.mainpitch.description,
            }}
          ></p>
          <div className="link-arrow-black">
            {mainpitch.mainpitch.button && (
              <a href={mainpitch.mainpitch.link}>
                {mainpitch.mainpitch.button}{" "}
                <img alt="arrow icon" src={arrow} />
              </a>
            )}
          </div>
        </div>
        <div className="imagetext-img">
          <PreviewCompatibleImage imageInfo={imageInfo} className="img-imagetext" />
        </div>
      </div>
    </section>
  );
};

TextImage.propTypes = {
  mainpitch: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    description: PropTypes.string,
    button: PropTypes.string,
    link: PropTypes.string,
  }),
};

export default TextImage;

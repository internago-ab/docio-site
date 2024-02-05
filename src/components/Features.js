import * as React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import arrow from "../images/icons/arrow-black.svg";

function FeatureGrid({ gridItems }) {
  return (
    <div>
      {gridItems.map((item, index) => (
        <section className={`section ${item.bgColor}`} key={index}>
          <div className={`bg-text-image ${item.reverse ? "reverse" : ""}`}>
            <div className="text-container bg-text-white">
              <h2>{item.title}</h2>
              <p
                className="paragraph"
                dangerouslySetInnerHTML={{ __html: item.text }}
              ></p>
              <div className="link-arrow-black">
                {item.button && (
                  <a href={item.link}>
                    {item.button} <img alt="Arrow icon" src={arrow} />
                  </a>
                )}
              </div>
            </div>
            <div className="image-container">
              {item.image && (
                <PreviewCompatibleImage
                  imageInfo={{
                    image: item.image,
                    alt: item.alt || "Default alt text", // Use alt text if available
                  }}
                  className="img-imagetext"
                  style={
                    item.reverse
                      ? { marginRight: "var(--spacing-s)" }
                      : { marginLeft: "var(--spacing-s)" }
                  }
                />
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      alt: PropTypes.string, 
      text: PropTypes.string,
      title: PropTypes.string,
      button: PropTypes.string,
      link: PropTypes.string,
    }),
  ),
};

export default FeatureGrid;

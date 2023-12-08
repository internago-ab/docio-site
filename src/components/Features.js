import * as React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import arrow from "../images/icons/arrow-black.svg";

import "./payroll-block.css";
function FeatureGrid({ gridItems }) {
  console.log(gridItems, "gridItems");
  return (
    <div>
      {gridItems.map((item) => (
        <section className={`section ${item.bgColor}`}>
          <div className={`bg-text-image ${item.reverse}`}>
            <div className="text-container bg-text-white">
              <h2>{item.title}</h2>
              <p
                className="paragraph"
                dangerouslySetInnerHTML={{ __html: item.text }}
              ></p>
              <div className="link-arrow-black">
                {item.button && (
                  <a href={item.link}>
                    {item.button} <img alt="arrow icon" src={arrow} />
                  </a>
                )}
              </div>
            </div>
            <div className="image-container">
              <PreviewCompatibleImage
                imageInfo={item}
                alt=""
                className="img-imagetext"
                style={
                  item.reverse
                    ? { marginRight: "var(--spacing-s)" }
                    : { marginLeft: "var(--spacing-s)" }
                }
              />
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
      text: PropTypes.string,
      title: PropTypes.string,
      button: PropTypes.string,
      reverse: PropTypes.reverse,
    }),
  ),
};

export default FeatureGrid;

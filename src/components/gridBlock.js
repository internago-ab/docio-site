import React, { useState } from "react";

import PropTypes from "prop-types";
import arrow from "../images/icons/arrow-black.svg";
import useWindowSize from "./useWindowSize";

import "./icongrid.css";
function FeatureGrid({ gridItems, blocks }) {
  const [limit, setLimit] = useState(3);
  const { width } = useWindowSize();

  const content = gridItems;

  const showMoreDocuments = () => {
    setLimit(limit ? content.length : 3);
    console.log(limit);

    if (limit === 6) {
      setLimit(limit ? 3 : 3);
    }
  };

  return (
    <section className="icon-wrapper">
      <h2 className="icon-header">{blocks.blocksHeading}</h2>
      <p
        className="icon-text"
        dangerouslySetInnerHTML={{ __html: blocks.blocksDescription }}
      ></p>
      <div className="icon-btn">
        <div className="link-arrow-black">
          <a href="/payroll">
            Read more <img alt="arrow icon" src={arrow} />
          </a>
        </div>
      </div>
      <ul className="icon-grid">
        {width > 599 &&
          gridItems.map((item, index) => (
            <li key={index} className="icon-item" data-aos="fade-zoom-in">
              <button
                onClick={() => (window.location.href = item.link)}
                className="ink"
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </button>
            </li>
          ))}

        {width < 599 &&
          gridItems.slice(0, limit).map((item, index) => (
            <li key={index} className="icon-item" data-aos="fade-zoom-in">
              <button
                onClick={() => (window.location.href = item.link)}
                className="ink"
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </button>
            </li>
          ))}
        <div className="cta-btn show-more">
          <a className="show-more" onClick={showMoreDocuments}>
            {" "}
            {limit === 6 ? "Show less" : "Show more"}
          </a>
        </div>
      </ul>
    </section>
  );
}

FeatureGrid.propTypes = {
  blocksHeading: PropTypes.string,
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
      title: PropTypes.string,
      button: PropTypes.string,
    }),
  ),
};

export default FeatureGrid;

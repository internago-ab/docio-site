import React, { useState } from "react";

import arrow from "../images/icons/arrow-black.svg";

import "./icongrid.css";

function Icongrid(props) {
  const [limit, setLimit] = useState(3);

  const content = props.content;

  const showMoreDocuments = () => {
    setLimit(limit ? content.length : 3);
    console.log(limit);
    //const numberOfItems = showMore ? projects.length : 3;
    if (limit === 6) {
      setLimit(limit ? 3 : 3);
    }
  };

  return (
    <section className="icon-wrapper">
      <h2 className="icon-header">{props.header}</h2>
      <p
        className="icon-text"
        dangerouslySetInnerHTML={{ __html: props.text }}
      ></p>
      <div className="icon-btn">
        <div className="link-arrow-black">
          {props.button && (
            <a href={props.link}>
              {props.button} <img alt="arrow icon" src={arrow} />
            </a>
          )}
        </div>
      </div>
      <ul className="icon-grid">
        {content.map((item, index) => (
          <li key={index} className="icon-item" data-aos="fade-zoom-in">
            <button
              onClick={() => (window.location.href = item.link)}
              className="ink"
            >
              <h3>{item.header}</h3>
              <p>{item.text}</p>
            </button>
          </li>
        ))}
        <div className="cta-btn show-more">
          <button className="show-more" onClick={showMoreDocuments}>
            {" "}
            {limit === 6 ? "Show less" : "Show more"}
          </button>
        </div>
      </ul>
    </section>
  );
}

export default Icongrid;

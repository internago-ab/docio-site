import React from "react";
import image from "../images/meeting.jpg";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

import "./list-block.css";

function ListBlock({ gridItems, lists }) {

  const content = gridItems;
  const imageInfo = lists.image ? {
    image: lists.image,
    alt: lists.image.alt || "Default alt text",
    ...lists.image, // Spread the cta.image object to capture both childImageSharp and any other structure it might have
  } : null;
  return (
    <div className="section list-image">
      <div className="list-block">
        <div className="list-block-content">
          <h3>{lists.listsDescription}</h3>
          <h2>{lists.listsHeading}</h2>
          <div>
            <ul className="">
              {content.map((item, index) => (
                <li key={index} className="">
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="list-block-img">
      {imageInfo && (
            <PreviewCompatibleImage imageInfo={imageInfo} />
        )}
      </div>
    </div>
  );
}

export default ListBlock;

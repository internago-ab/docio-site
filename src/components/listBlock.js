import React from "react"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

import "./list-block.css"

function ListBlock({ gridItems, lists }) {

    const content = gridItems;

  return (
    <div className="section list-image">
        <div className="list-block">
            <div className="list-block-content">
            <h3 >{lists.listsDescription}</h3>
            <h2>{lists.listsHeading}</h2>
            <div>
                <ul className="">
                {content.map((item, index) => (
                    <li key={index} className="">
                        <p >{item.text}</p>
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </div>
        <div className="list-block-img">
        <PreviewCompatibleImage
            imageInfo={lists.image}
            alt=""
            className="img-imagetext"
          />
        </div>
    </div>
  )
}

export default ListBlock

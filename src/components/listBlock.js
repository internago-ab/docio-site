import React from "react"
import "./list-block.css"

function ListBlock(props) {

  const content = props.content

  return (
    <div className="section list-image">
        <div className="list-block">
            <div className="list-block-content">
            <h3 >{props.intro}</h3>
            <h2 >{props.header}</h2>
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
            <img src={props.image} alt="" data-aos="fade-in-right"/>
        </div>
    </div>
  )
}

export default ListBlock

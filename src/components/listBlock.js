import React,{ useEffect } from "react"
import "./list-block.scss"



function ListBlock(props) {

    const content = props.content

  return (
    <section className="section list-image">
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
            <img src={props.image} data-aos="fade-in-right"/>
        </div>
    </section>
  )
}

export default ListBlock

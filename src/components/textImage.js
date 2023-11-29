import React from "react"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import arrow from '../images/icons/arrow-black.svg'

import "./text-image.css"

const TextImage = mainpitch => {
  console.log(mainpitch.mainpitch, 'mainpicth!!')

  return (
    <section className="section">
    <div className={`imagetext`}>
       <div className="imagetext-content">
            <h2 >{mainpitch.mainpitch.title}</h2>
            <p
          
            className="paragraph"
            dangerouslySetInnerHTML={{ __html: mainpitch.mainpitch.description }}
          ></p>
          <div className='link-arrow-black'>
            {mainpitch.mainpitch.button && <a href={mainpitch.mainpitch.link}>{mainpitch.mainpitch.button} <img alt="arrow icon" src={arrow}/></a>}
          </div>
        
        </div>
       <div className="imagetext-img">
       <PreviewCompatibleImage imageInfo={mainpitch.mainpitch.image} alt=''
           className="img-imagetext"
          //  style={
          //   item.reverse
          //      ? { marginRight: "var(--spacing-s)" }
          //      : { marginLeft: "var(--spacing-s)" }
          //  }
           /> 
       </div>
    </div>
    </section>
  )
}

export default TextImage

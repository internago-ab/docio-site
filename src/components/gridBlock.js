import React,{ useEffect, useState } from "react"

import PropTypes from "prop-types";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import arrow from '../images/icons/arrow-black.svg'

import "./icongrid.css"

function FeatureGrid ({ gridItems, title }) {

    const [limit, setLimit] = useState( 3 )
    const [width, setWidth] = useState(window.innerWidth);

  const content = gridItems
  
    const showMoreDocuments = () => { 
      setLimit(limit ? content.length :3)
      console.log(limit)

      if (limit === 6){
        setLimit(limit ? 3 : 3)
      }
    };
  
    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [width]);
    
  return(
   <section className="icon-wrapper">
   <h2 className="icon-header">Six reasons to go with Docio</h2>
   <p className="icon-text"><strong> International payroll can be challenging, but it is important and has to be done.</strong><br></br><br></br> And we have the perfect tool to help you with payroll and a variety of other HR tasks. You can efficiently store and manage employee and payroll data in one place, controlled via one online interface. All you have to do is check and approve.</p>
   <div className="icon-btn">
       <div className='link-arrow-black'>
       <a href='/payroll'>Read more <img alt="arrow icon" src={arrow}/></a>
     </div>
   </div>
   <ul className="icon-grid">
     
    {width > 600 &&( gridItems.map((item, index) => (
       <li key={index} className="icon-item" data-aos="fade-zoom-in">
         <button onClick={() => window.location.href = item.link } className='ink'>
           <h3>{item.title}</h3>
           <p>{item.text}</p>
         </button>
       </li>
   )))}

       {width < 599 && (
         gridItems
         .slice(0, limit)
         .map((item, index) => (
           <li key={index} className="icon-item" data-aos="fade-zoom-in">
             <button onClick={() => window.location.href = item.link } className='ink'>
               <h3>{item.title}</h3>
               <p>{item.text}</p>
             </button>
           </li>)))}
           <div className="cta-btn show-more">
             <a className="show-more" onClick={showMoreDocuments}> {limit === 6 ? "Show less" : "Show more"}</a>
           </div>
       </ul>
   
</section>

  )
          }
/* <PreviewCompatibleImage imageInfo={item} /> */

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
      title: PropTypes.string,
      button: PropTypes.string,
    })
  ),
};

export default FeatureGrid;

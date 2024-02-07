import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import TextImage from "../components/textImage";
import Testimonials from "../components/Testimonials";
import FullWidthImage from "../components/FullWidthImage";
// import { getImage } from "gatsby-plugin-image";

import "../components/testimonials.css";

// eslint-disable-next-line
export const AboutPageTemplate = ({
  title,
  content,
  alt,
  contentComponent,
  mainpitch,
  testimonials,
  fullImage,
}) => {
  const PageContent = contentComponent || Content;
  // const fullWidthImage = getImage(fullImage) || fullImage;
  const imageSrc = fullImage && fullImage.childImageSharp 
  ? fullImage.childImageSharp.gatsbyImageData 
  : fullImage;
  return (
    <>
      <div className="section-bg">
        <div className="">
          <h1>{title}</h1>
          <PageContent className="" content={content} />
        </div>
      </div>
      <div className='about-text-image'>
      <TextImage mainpitch={mainpitch}/>
      </div>
      <section id="fullImage">
        <section className="section">
          <Testimonials testimonials={testimonials} />
        </section>
        <FullWidthImage img={imageSrc} imgPosition={"bottom"} alt={alt} />
      </section>
    </>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  mainpitch: PropTypes.object,
  testimonials: PropTypes.array,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  alt: PropTypes.string,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        mainpitch={post.frontmatter.mainpitch}
        testimonials={post.frontmatter.testimonials}
        fullImage={post.frontmatter.full_image}
        alt={post.frontmatter.alt}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        mainpitch {
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          alt
          title
          description
          button
          link
        }
        testimonials {
          author
          quote
        }
        full_image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        alt
      }
    }
  }
`;

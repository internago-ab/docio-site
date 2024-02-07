import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

import "../components/solution.css"
// eslint-disable-next-line
export const SolutionPostTemplate = ({
  description,
  title,
  slogan,
  subheader,
  text,
  helmet,
  image,
  alt,
}) => {

  const splitTextIntoColumns = (text, wordLimit = 50) => {
    const words = text.split(' '); // Split text into words
    if (words.length <= wordLimit) {
      return [text]; // If the text is shorter than the limit, return it as is
    }
  
    const firstPart = words.slice(0, wordLimit).join(' ');
    const secondPart = words.slice(wordLimit).join(' ');
  
    return [firstPart, secondPart];
  };
  const [firstColumnText, secondColumnText] = splitTextIntoColumns(text);
  

  return (
    <div className=" ">
      <div className="blog-post-main">
        {helmet || ""}
        <div className="container content solution-header">
          <div className="columns ">
            <div className="column">
            <h3 className="slogan">{slogan}</h3>
              <h1 className="title">{title}</h1>
              <p>{description}</p>
            </div>
            <div className="side">
            <p className="mail">info@internago.com</p>
            <p className="mail side-title">{title}</p>
            </div>
          </div>
         <div className="solution-image">
         <PreviewCompatibleImage
              imageInfo={{
                image: image,
                alt: alt || "Default alt text"
              }}
              />
         </div>
          <section className="section sub-section">
              <div className="">
              <h2 className="title">{subheader}</h2>
              <div className="text-split">
              <p className="first-text">{firstColumnText}</p>
                {secondColumnText && ( // Only render the second column if there's text for it
                  <div className="column">
                    <p>{secondColumnText}</p>
                  </div>
                )}
              </div>
              
              </div>
            </section>
        </div>
      </div>
    </div>
  );
};

SolutionPostTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  slogan: PropTypes.string,
  alt: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  helmet: PropTypes.object,
  subheader: PropTypes.string,
  text: PropTypes.string,
};

const SolutionPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <SolutionPostTemplate
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Solutions">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        slogan={post.frontmatter.slogan}
        subheader={post.frontmatter.subheader}
        text={post.frontmatter.text}
        image={post.frontmatter.image}
        alt={post.frontmatter.alt || "Default alt text"}
      />
    </Layout>
  );
};


SolutionPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default SolutionPost;

export const pageQuery = graphql`
  query SolutionPostByID(
    $id: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        slogan
        title
        description
        subheader
        text
        alt
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "solution-page" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
        }
      }
    }
  }
`;

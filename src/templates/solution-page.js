import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

import "./blog-post.css";
// eslint-disable-next-line
export const SolutionPostTemplate = ({
  description,
  title,
  helmet,
}) => {


  return (
    <section className="section ">
      <div className="blog-post-main">
        {helmet || ""}
        <div className="container content blog-post">
          <div className="columns">
            <div className="column">
              <h2 className="title">{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

SolutionPostTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const SolutionPost = ({ data }) => {
  const { markdownRemark: post} = data;

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
      html
      frontmatter {
        title
        description
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
          frontmatter {
            title
            featuredimage {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;

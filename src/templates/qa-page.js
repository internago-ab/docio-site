import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import QuestionsAnswers from "../components/QuestionsAnswers";
import FullWidthImage from "../components/FullWidthImage";

import "../../src/components/questionsAnswers.css";

// eslint-disable-next-line
export const QaPageTemplate = ({
  image,
  title,
  heading,
  button,
  href,
  subheading,
  fullImage,
  qa,
}) => {
  const heroImage = getImage(image) || image;
  const fullWidthImage = getImage(fullImage) || fullImage;

  return (
    <div className="content">
      <div className="hero hero-product">
      <FullWidthImage
       img={heroImage}
       title={title}
       subheading={subheading}
       button={button}
       heading={heading}
       href={href}
      />
      </div>
      <section className="section section--gradient">
        <div className="container">
          <div className="">
            <div className="columns">
              <div className="prices">
                <h2 className="has-text-weight-semibold is-size-2">
                  {qa.heading}
                </h2>
                <p className="prices-description">{qa.description}</p>
                <QuestionsAnswers categories={qa.categories} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

QaPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  qa: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.array,
  }),
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <QaPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        button={frontmatter.button}
        href={frontmatter.href}
        description={frontmatter.description}
        qa={frontmatter.qa}
      />
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        heading
        title
        subheading
        href
        button
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        qa {
          heading
          description
          categories {
            categoryNames
            countryNames
            questions {
              subHeader
              description
              answer
            }
          }
        }
      }
    }
  }
`;

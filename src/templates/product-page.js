import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Pricing from "../components/Pricing";
import FullWidthImage from "../components/FullWidthImage";

import "../../src/components/pricing.css";

// eslint-disable-next-line
export const ProductPageTemplate = ({
  image,
  title,
  heading,
  button,
  href,
  subheading,
  fullImage,
  pricing,
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
                  {pricing.heading}
                </h2>
                <p className="prices-description">{pricing.description}</p>
                <Pricing categories={pricing.categories} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    plans: PropTypes.array,
  }),
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProductPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        button={frontmatter.button}
        href={frontmatter.href}
        description={frontmatter.description}
        pricing={frontmatter.pricing}
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
        pricing {
          heading
          description
          categories {
            categoryName
            plans {
              priceDescription
              description
              plan
              price
            }
          }
        }
      }
    }
  }
`;


import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import "../components/link.css";
// import Seo from "../components/seo";

import TextImage from "../components/textImage";
import ListBlock from "../components/listBlock";
import GridBlock from "../components/gridBlock";
import FullWidthImage from "../components/FullWidthImage";
import Features from "../components/Features";

import listImage from '../images/businessPeople.jpg'
//style
import "../../src/style.css";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  href,
  button,
  intro,
  blocks,
  mainpitch
}) => {
  const heroImage = getImage(image) || image;

  return (
    
    <main>
    <FullWidthImage img={heroImage} title={title} subheading={subheading} button={button} heading={heading} href={href} />
    <Features gridItems={intro.blurbs}  />
    <TextImage mainpitch={mainpitch}/>
    <GridBlock gridItems={blocks.grid} blocks={blocks} />
    <ListBlock
      intro="Payroll portal"
      header="Manage your payroll across multiple international markets with one online interface."
      image={listImage}
      alt="People walking outside a building"
      content={[
        {
          text: "Gross up calculations",
        },
        {
          text: "Payments",
        },
        {
          text: "Tax filing",
        },
        {
          text: "Implementation and onboarding",
        },
        {
          text: "Gross to net (GTN)",
        },
        {
          text: "Shadow payroll",
        },
        {
          text: "Leaver calculations",
        },
        {
          text: "Bonus and RSU calculations",
        },
      ]}/>
  </main>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  blocks: PropTypes.shape({
    blocksHeading: PropTypes.string,
    blocksDescription: PropTypes.string,
    grid: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        button={frontmatter.button}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        blocks={frontmatter.blocks}
        href={frontmatter.href}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        description
        href
        button
        mainpitch {
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          title
          description
          button
          link
        }
        blocks {
          blocksHeading
          blocksDescription
          grid {
            text
            title
            link
        }
      }
        intro {
          description
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(quality:100, layout: CONSTRAINED)
              }
            }
            text
            title
            button
            link
            bgColor
            reverse
          }
        }
      }
    }
  }
`;

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
  intro,
  blocks,
  mainpitch
}) => {
  const heroImage = getImage(image) || image;

  return (
    
    <main>
    <FullWidthImage img={heroImage} title={title} subheading={subheading} heading={heading} href={href} />
   
    <Features gridItems={intro.blurbs}  />
    <TextImage mainpitch={mainpitch}/>
    <GridBlock gridItems={blocks.grid} title={title} />
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
    {/* 
    <div className="card-img-wrapper">
      <div className="card-img">
        <img src={workers} alt="Three men walking downstairs" />
      </div>
    </div>
    <TextImage
      reverse="rowreverse"
      title="Share Doc"
      text="<strong>The Share documents module greatly facilitates the sharing and management of payroll and accounting related files.</strong> <br></br> A perfect tool for payroll management and various declarations to individuals and companies."
      image={computerMockup}
      alt="Internagos dashborard on a computerscreen and a tablet"
      button="Read more"
      link="/"
    />

    {/* /> */}
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
        mainpitch {
          title
          description
          button
          link
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
        blocks {
          grid {
            text
            title
            link
        }
      }
        intro {
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
          heading
          description
        }
      }
    }
  }
`;

import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

import './blog-post.css'
// eslint-disable-next-line
export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  recentPosts // Make sure to receive recentPosts as a prop
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section ">
      <div className="blog-post-main">
      {helmet || ""}
          {/* Recent Posts Section */}
          <aside className="column is-3 blog-post-sidebar">
          <h2>Recent posts</h2>
          {recentPosts && Array.isArray(recentPosts) && recentPosts.map((post) => (
  <div key={post.id || 'fallback-id'}>
    <h3>
      <Link to={post.frontmatter?.path || '/'}>{post.frontmatter?.title || 'Untitled'}</Link>
    </h3>
    <p>{post.frontmatter?.date || 'No date'}</p>
  </div>
))}

        </aside>
      <div className="container content blog-post">
      
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h2>
             {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p>{description}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
  helmet: PropTypes.object,
  recentPosts: PropTypes.array // Add this to validate recentPosts prop
};



const BlogPost = ({ data }) => {
  const { markdownRemark: post, recentPosts } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        recentPosts={recentPosts.edges.map(edge => edge.node)} // Pass recent posts
      />
    </Layout>
  );
};


BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 4
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

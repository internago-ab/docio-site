import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

import "./blog-post.css";
// eslint-disable-next-line
export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  recentPosts, // Make sure to receive recentPosts as a prop
  previousPost, // Add this
  nextPost,
}) => {
  const PostContent = contentComponent || Content;
  const safeRecentPosts = recentPosts || [];

  return (
    <section className="section ">
      <div className="blog-post-main">
        {helmet || ""}
        {/* Recent Posts Section */}
        <aside className="blog-post-sidebar">
          <h2>Recent posts</h2>
          {safeRecentPosts &&
            Array.isArray(safeRecentPosts) &&
            safeRecentPosts.map((post) => (
              <div key={post.id || "fallback-id"} className="sidebar-post">
                <h3>
                  <Link to={post.fields.slug || "/"}>
                    {post.frontmatter?.title || "Untitled"}
                  </Link>
                </h3>
                <p>{post.frontmatter?.date || "No date"}</p>
                {post?.frontmatter?.featuredimage && (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        width:
                          post.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.width,
                        height:
                          post.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.height,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

          {tags && tags.length ? (
            <div style={{ marginTop: `4rem` }}>
              <h2>Tags</h2>
              <ul className="taglist">
                {tags.map((tag) => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
        <div className="container content blog-post">
          <div className="columns">
            <div className="column">
              <h2 className="title">{title}</h2>
              <p>{description}</p>
              <PostContent content={content} />
            </div>
          </div>
          <div className="blog-links">
            {previousPost && (
              <Link to={previousPost.fields.slug}>
                ← {previousPost.frontmatter.title}
              </Link>
            )}
            {nextPost && (
              <Link to={nextPost.fields.slug}>
                {nextPost.frontmatter.title} →
              </Link>
            )}
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
  recentPosts: PropTypes.array,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post, recentPosts, previousPost, nextPost } = data;

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
        recentPosts={recentPosts.edges.map((edge) => edge.node)} // Pass recent posts
        previousPost={previousPost}
        nextPost={nextPost}
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
  query BlogPostByID(
    $id: String
    $previousPostId: String
    $nextPostId: String
  ) {
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
      limit: 3
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            featuredimage {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
    previousPost: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    nextPost: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

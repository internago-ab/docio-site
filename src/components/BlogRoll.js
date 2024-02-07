import React, { useState, useEffect,useMemo } from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import arrow from "../images/icons/arrow-black.svg";

const BlogRollTemplate = (props) => {
  const { edges: allPosts } = props.data.allMarkdownRemark;

  const postsPerPage = 3; // Number of posts per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [selectedTag, setSelectedTag] = useState(""); // Initially, no tag is selected
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [showAllTags, setShowAllTags] = useState(false);
  const [clickCounts, setClickCounts] = useState({});

  // Create a Set to store unique tags
  const uniqueTags = new Set();

  // Collect unique tags from all posts
  allPosts.forEach((post) => {
    const tags = post.node.frontmatter.tags;
    tags.forEach((tag) => uniqueTags.add(tag));
  });

  // Convert the Set back to an array
  const allUniqueTags = [...uniqueTags];

  // Limit the number of tags shown to 3 by default
  const tagsToDisplay = showAllTags
    ? allUniqueTags
    : allUniqueTags.slice(0, 5);

  // Define a filteredPosts array based on the selected tag and search term
  const filteredPosts = allPosts.filter((post) => {
    const hasSelectedTag = selectedTag
      ? post.node.frontmatter.tags.includes(selectedTag)
      : true;

    const hasSearchTerm =
      !searchTerm ||
      post.node.frontmatter.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      post.node.frontmatter.tags
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return hasSelectedTag && hasSearchTerm;
  });
  const handlePostClick = (postId) => {
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [postId]: (prevCounts[postId] || 0) + 1,
    }));
  };
  const topPosts = useMemo(() => {
    const sortedPosts = [...allPosts].sort((a, b) => {
      const clicksA = clickCounts[a.node.id] || 0;
      const clicksB = clickCounts[b.node.id] || 0;
      return clicksB - clicksA;
    });
    return sortedPosts.slice(0, 5);
  }, [allPosts, clickCounts]);

  
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // Update the filteredPosts when the selected tag or search term changes
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when the tag or search term changes
  }, [selectedTag, searchTerm]);

  // Function to handle tag selection
  const handleTagClick = (tag) => {
    setSelectedTag(tag); // Update the selected tag state variable
  };

  // Function to handle search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to toggle showing all tags
  const handleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  // Function to handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="blog">
      <div className="blog-filter">
        {/* Search bar */}
        <div className="input">
          <input
            type="text"
            placeholder="Search posts.."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {/* Tags filter buttons */}
        <div className="filter-tags filter">
          <span>Filter by Tag: </span>
          <div className="tag-list">
            {tagsToDisplay.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={selectedTag === tag ? "active tag" : "tag"}
              >
                {tag}
              </button>
            ))}
          </div>
          {allUniqueTags.length > 3 && (
            <button onClick={handleShowAllTags} className="show-more-btn">
              {showAllTags ? "Show Less" : "Show More"}
            </button>
          )}
  
    </div>
    <div className="filter filter-top-posts">
    <h3>Top Posts</h3>
      <div className="top-posts">
        {topPosts.map(({ node: post }, index) => (
          <div className="top-post" key={post.id}>
            <h3>{index + 1}</h3>
            <div>
            <h4>{post.frontmatter.title}</h4>
            <p>{post.frontmatter.date}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
      <div>
        <div className="blog-grid is-multiline">
          {filteredPosts &&
            filteredPosts
              .slice(startIndex, endIndex)
              .map(({ node: post }) => (
                <div className=" blog-card" key={post.id}>
                  <article
                    className={`blog-list-item tile is-child box notification ${
                      post.frontmatter.featuredpost ? "is-featured" : ""
                    }`}
                  >
                    <header>
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
                    </header>
                    <div className="text">
                      <div className="post-meta">
                        <p className="subtitle is-size-5 is-block">
                          {post.frontmatter.date}
                        </p>
                        <h2>
                          <Link
                            className="title has-text-primary is-size-4"
                            to={post.fields.slug}
                            onClick={() => handlePostClick(post.id)}
                          >
                            {post.frontmatter.title}
                          </Link>
                        </h2>
                        {/* Render tags here inside each post card */}
                        {post.frontmatter.tags && (
                          <div className="tags">
                            {post.frontmatter.tags.map((tag, index) => (
                              <React.Fragment key={tag}>
                                <button
                                  onClick={() => handleTagClick(tag)}
                                  className={
                                    selectedTag === tag ? "active tag" : "tag"
                                  }
                                >
                                  {tag}
                                </button>
                                {index < post.frontmatter.tags.length - 1 && ", "}
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="description">{post.excerpt}</p>
                    </div>

                    <div className="link-arrow-black" >
                      <Link className="read-more" to={post.fields.slug} onClick={() => handlePostClick(post.id)}>
                        Keep Reading <img alt="arrow icon" src={arrow} />
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
        </div>
        <div className="page-indicator">
          {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

BlogRollTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function BlogRoll() {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 180)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  tags
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(quality: 100, layout: CONSTRAINED)
                    }
                  }
                }
              }
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
                frontmatter {
                  title
                  date(formatString: "MMMM DD, YYYY")
                }
              }
            }
          }
        }
      `}
      render={(data, count) => {
        const recentPosts = data.recentPosts.edges.map(edge => edge.node);
        const tags = data.allMarkdownRemark.edges
          .map(({ node }) => node.frontmatter.tags)
          .flat()
          .filter((tag) => tag != null);

        return <BlogRollTemplate data={data} count={count} tags={tags} recentPosts={recentPosts}/>;
      }}
    />
  );
}




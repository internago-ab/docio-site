import * as React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import '../../components/blog.css'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
 
          <h1
            className="has-text-weight-bold is-size-1"
          >
            Latest Stories
          </h1>

        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

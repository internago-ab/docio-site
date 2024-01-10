import React from "react";
import Layout from "../../components/Layout";
import "../../components/thank-you.css"

// eslint-disable-next-line
export default () => (
  <Layout>
     <section className="section ">
      <div className="main-thank">
        <div className="card">
          <h2 className="heading">Thank you!</h2>
          <p className="paragraph">Your form submission has been received.</p>
          <div className="cta-btn btn-thank">
            <a href="/">← Back to our site</a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

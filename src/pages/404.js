import * as React from "react"

import Layout from "../components/Layout"

const NotFoundPage = ({ data, location }) => {

  return (
    <Layout>
      <section className="error-page">
        <h1>404: Not Found</h1>
        <p>The page that you are looking does not exist.</p>
        <div className="cta-btn">
          <a to="/" >Go to homepage</a>
        </div>
      </section>
    </Layout>
  )
}

export default NotFoundPage
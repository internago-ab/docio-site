import * as React from "react";
import { navigate } from "gatsby-link";
import Layout from "../../components/Layout";
import "../../components/contact.css";


function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="section landing">
          <div className="container landing-wrapper">
            <div className="flex-left">
              <h1 className="heading">Do you prefer that we get get back to you?</h1>
              <p>We are happy to hear from you, and our team is ready to assist you with any question you might have. You can always get in touch with Internago with any type of question – just fill in this form and we will get back to you!</p>
            </div>
            <div className="content form-demo-header">
              <h2 className="form-header heading">Let’s chat about your payroll needs</h2>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{" "}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="form-flex">
                <div className="field input-field input-name">
                    <input
                      className="input"
                      type={"text"}
                      name={"name"}
                      onChange={this.handleChange}
                      id={"name"}
                      required={true}
                    />
                     <label className="label" htmlFor={"name"}>
                    Your name
                  </label>
                </div>
                <div className="field input-field input-mail">
                    <input
                      className="input"
                      type={"email"}
                      name={"email"}
                      onChange={this.handleChange}
                      id={"email"}
                      required={true}
                    />
                    <label className="label" htmlFor={"email"}>
                    Email
                  </label>
                </div>
                </div>
                <div className="field input-field input-text">
                    <textarea
                      className="textarea"
                      name={"message"}
                      onChange={this.handleChange}
                      id={"message"}
                      required={true}
                    />
                    <label className="label inputField messageField" htmlFor={"message"}>
                    Message
                  </label>
                </div>
                <p className="form-privacy">We value your privacy and we’ll only send you relevant information. 
For full details, check out our privacy policy</p>
                <div className="field btn-form-main">
                  {/* <button className="button is-link formButton" type="submit">
                    Send
                  </button> */}
                  <input type="submit" value="Send message" className="formButton is-link" />

                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

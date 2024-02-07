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

  // New method to handle file selection
  handleAttachment = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Append file to formData if it exists
    if (this.state.attachment) {
      formData.append("attachment", this.state.attachment);
    }

    fetch("/", {
      method: "POST",
      body: formData, // Updated to use FormData
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
              <h1 className="heading">
                Do you prefer that we get get back to you?
              </h1>
              <p>
                We are happy to hear from you, and our team is ready to assist
                you with any question you might have. You can always get in
                touch with Internago with any type of question – just fill in
                this form and we will get back to you!
              </p>
            </div>
            <div className="content form-demo-header">
              <h2 className="form-header heading">
                Let’s chat about your payroll needs
              </h2>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
                encType="multipart/form-data"
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
                      type="email"
                      id="email"
                      name="email"
                      onChange={this.handleChange}
                      required={true}
                      placeholder=" "
                    />
                    <label className=" email-label" htmlFor={"email"}>
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
                  <label
                    className="label inputField messageField"
                    htmlFor={"message"}
                  >
                    Message
                  </label>
                </div>
                <div className="field">
                <input
                  className="file-input"
                  type="file"
                  id="file" 
                  name="attachment"
                  onChange={this.handleAttachment}
                  style={{ opacity: 0, position: 'absolute', zIndex: -1 }} 
                />
                <label htmlFor="file" className="file-btn button is-link"> 
                  Upload File
                </label>
              </div>
                <p className="form-privacy">
                  We value your privacy and we’ll only send you relevant
                  information. For full details, check out our privacy policy
                </p>
                <div className="field btn-form-main">
                  <input
                    type="submit"
                    value="Send message"
                    className="formButton is-link"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

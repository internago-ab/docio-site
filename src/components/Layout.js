import React, { useState, useEffect, useCallback } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import "./layout.css";
import PropTypes from "prop-types";
import useSiteMetadata from "./SiteMetadata";
import { Helmet } from "react-helmet";
import { withPrefix } from "gatsby";

import docioLogo from "../images/docio-logo.png";
import linkedin from "../images/linkedin.svg";
import twitter from "../images/twitter.svg";
import docioLogoWhite from "../images/docio-logo-white.svg";

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const [visible] = useState(true);

  function toggleMenu() {
    const newMenuDisplayed = !menuDisplayed;
    setMenuDisplayed(newMenuDisplayed);

    if (newMenuDisplayed) {
      setTimeout(calculateMenuHeight, 10);
    } else {
      setMenuHeight("0px");
    }
    animateHamburger();
  }

  function animateHamburger() {
    let lines = Array.from(document.querySelectorAll(".hamburger div"));
    lines.forEach(
      (line) =>
        (line.style.animation = `${line.className} 0.5s ease ${
          menuDisplayed ? "reverse" : "normal"
        }`),
    );
  }

  const data = useStaticQuery(graphql`
    query SolutionTitlesQuery {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "solution-page" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const solutions = data.allMarkdownRemark.edges.map((edge) => ({
    title: edge.node.frontmatter.title,
    slug: edge.node.fields.slug,
  }));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState("0px");
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-content")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const toggleSolutionsDropdown = () => {
    setIsSolutionsDropdownOpen(prevState => !prevState);
    // Ensure Resources dropdown is closed when Solutions is toggled
    if (isResourcesDropdownOpen) {
      setIsResourcesDropdownOpen(false);
    }
  };
  
  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(prevState => !prevState);
    // Ensure Solutions dropdown is closed when Resources is toggled
    if (isSolutionsDropdownOpen) {
      setIsSolutionsDropdownOpen(false);
    }
  };
  

  const calculateMenuHeight = useCallback(() => {
    if (menuDisplayed) {
      const menuNode = document.querySelector('.mobile-menu');
      const height = menuNode ? menuNode.scrollHeight : 0;
  
      setMenuHeight(`${height}px`);
    } else {
      setMenuHeight('0px');
    }
  }, [menuDisplayed]); // Add any other dependencies if calculateMenuHeight uses them
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (menuDisplayed) {
        calculateMenuHeight();
      } else {
        setMenuHeight('0px');
      }
    }, 300);
  
    return () => clearTimeout(timeoutId);
  }, [menuDisplayed, isSolutionsDropdownOpen, calculateMenuHeight]);

  return (
    <div className="global-wrapper">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/docio-logo-white.svg`}
          sizes="32x32"
        />
        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <nav>
        <Link to="/" className="logo-link">
          <img className="logo" src={docioLogo} alt="logo"></img>
        </Link>

        <div className="mobile">
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="hamburger-menu"
          >
            <div
              className="line1"
              style={{
                transform: menuDisplayed
                  ? "translateY(9px) rotate(45deg)"
                  : "translateY(0px) rotate(0deg)",
              }}
              onAnimationEnd={(e) => (e.target.style.animation = "none")}
            ></div>
            <div
              className="line2"
              style={{ opacity: menuDisplayed ? 0 : 1 }}
              onAnimationEnd={(e) => (e.target.style.animation = "none")}
            ></div>
            <div
              className="line3"
              style={{
                transform: menuDisplayed
                  ? "translateY(-9px) rotate(-45deg)"
                  : "translateY(0px) rotate(0deg)",
              }}
              onAnimationEnd={(e) => (e.target.style.animation = "none")}
            ></div>
          </button>

          <ul
            className="mobile-menu"
            style={{
              top: visible ? "69px" : "-69px",
              overflow: menuDisplayed ? "unset" : "hidden",
              height: menuHeight,
            }}
          >
            <li>
              <Link
                to="/"
                className={`${menuDisplayed ? "li-active" : "li-not-active"}`}
              >
                Home
              </Link>
            </li>
            <div className="dropdown-flex">
                
            <button onClick={toggleSolutionsDropdown} className={`${menuDisplayed ? "li-active" : ""} solution-button`}>Solutions</button>
            <svg className={`${menuDisplayed ? "li-active" : ""} toggle-icon`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.51465 8.4652L11.9996 16.9502L20.4846 8.4652L19.0706 7.0502L11.9996 14.1222L4.92865 7.0502L3.51465 8.4652Z" fill="#4E4E4E"></path></svg>
            </div>
            <div
              className={`solutions-dropdown-content ${isSolutionsDropdownOpen ? "open" : ""}`}
            >
              {isSolutionsDropdownOpen && (
                <ul className="dropdown-content">
                  {solutions.map((solution) => (
                    <li key={solution.slug}>
                      <Link to={`${solution.slug}`}>
                        {solution.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <li>
              <Link to="/qa" className={`${menuDisplayed ? "li-active" : ""}`}>
                Q&A
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`${menuDisplayed ? "li-active" : ""}`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/partner"
                className={`${menuDisplayed ? "li-active" : ""}`}
              >
                Partner Integrations
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className={`${menuDisplayed ? "li-active" : ""}`}
              >
                Pricing
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className={`${menuDisplayed ? "li-active" : ""}`}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`${menuDisplayed ? "li-active" : ""}`}
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href="mailto:info@internago.com"
                className={`${menuDisplayed ? "li-active" : ""}`}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://payroll.internago.com/"
                className={`${menuDisplayed ? "li-active" : ""}`}
              >
                Go to portal
              </a>
            </li>
          </ul>
        </div>

        <ul className="desktop-menu">
        <div className="dropdown-flex menu">
                <div className="menu-link">
                <button onClick={toggleSolutionsDropdown} className={`${menuDisplayed ? "li-active" : ""} solution-button `}>Solutions</button>
                <svg className={`${menuDisplayed ? "li-active" : ""} toggle-icon`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.51465 8.4652L11.9996 16.9502L20.4846 8.4652L19.0706 7.0502L11.9996 14.1222L4.92865 7.0502L3.51465 8.4652Z" fill="#4E4E4E"></path></svg>
                </div>
                </div>
                <div
                  className={`solutions-dropdown-content ${isSolutionsDropdownOpen ? "open" : ""}`}
                >
                  {isSolutionsDropdownOpen && (
                    <ul className={`${menuDisplayed ? "li-active" : ""} dropdown-content dropdown-content-desktop submenu`}>
                      {solutions.map((solution) => (
                        <li key={solution.slug}>
                          <Link to={`${solution.slug}`}>
                            {solution.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
          <ul className="menu dropdown">
            <li className="has-dropdown dropdown">
              <div className="menu-link"
              onClick={toggleResourcesDropdown}
              onKeyDown={(e) => e.key === 'Enter' && toggleResourcesDropdown()}
              role="button"
              tabIndex="0"
              >
                Resourses
                <svg
                  className="toggle-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.51465 8.4652L11.9996 16.9502L20.4846 8.4652L19.0706 7.0502L11.9996 14.1222L4.92865 7.0502L3.51465 8.4652Z"
                    fill="#4E4E4E"
                  />
                </svg>
              </div>

              {isResourcesDropdownOpen && (
      <ul className="submenu">
        <li><Link to="/qa">Q&A</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/partner">Partner Integrations</Link></li>
      </ul>
    )}
            </li>
          </ul>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li className="cta-btn" id="inverted">
            <a href="mailto:info@internago.com">Contact us</a>
          </li>
          <li className="cta-btn">
            <a href="https://payroll.internago.com/">Go to portal</a>
          </li>
        </ul>
      </nav>

      <main>{children}</main>

      <footer>
        <img
          src={docioLogoWhite}
          alt="docio logo in white"
          className="docio-logo-white"
        />
        <div className="footer-flex">
          <div>
            <h3>About us</h3>
            <p>
              Let`s be honest, international payroll can be challenging, but it
              has to be done. We have the perfect tool for managing
              international payroll and HR related tasks for your international
              employees. We let you store and manage all important employee and
              payroll data in one place. Your job is simply to check and approve
              in the portal.
            </p>
          </div>

          <div className="contact-find-us">
            <h3>Find us</h3>
            <div className="contact-locations">
              <p>
                Internago Sweden
                <br />
                Tegelbacken 4A
                <br />
                111 52 Stockholm, Sweden
              </p>
              <p>
                Internago France
                <br />
                39, Av. Pierre 1er de Serbie
                <br />
                75008 Paris, France
              </p>
              <p>
                Internago Italy
                <br />
                Corso Vercelli, 57
                <br />
                20144 Milano, Italy
              </p>
            </div>
          </div>

          <div className="footer-contact">
            <h3>Contact us</h3>
            <a href="mailto:support@internago.com">info@internago.com</a>
            <div className="socials">
              <a href={`https://www.linkedin.com/company/internago-ab}`}>
                <img src={linkedin} alt="linkedin"></img>
                linkedin/internago
              </a>
              <a href={`https://twitter.com/Interna_GO`}>
                <img src={twitter} alt="linkedin"></img>
                @Interna_GO
              </a>
            </div>
          </div>
        </div>

        <div className="disclaimer">
          <a href="/privacy-policy" className="white-link">
            Data and privacy policy
          </a>
          <p>
            Copyright © 2017-<span>{new Date().getFullYear()}</span> All rights
            reserved to Internago AB.
          </p>
        </div>
      </footer>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

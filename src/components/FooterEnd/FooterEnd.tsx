import React from "react";
import classNames from "classnames";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaXing,
  FaYoutube,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import "./footerend.scss";

interface Props {
  modifier?: "in-sidebar";
}

const FooterEnd: React.FC<Props> = ({ modifier }) => (
  <div
    className={classNames("footer-end", {
      [`footer-end__${modifier}`]: modifier,
    })}
  >
    <div className="footer-social">
      <div className="footer-social__label">
        <p>Follow us:</p>
      </div>
      <div className="footer-social__links">
        <a
          href="https://www.facebook.com/aoepeople"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-a"
        >
          <FaFacebookF className="social-icon" />
        </a>

        <a
          href="https://twitter.com/aoepeople"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-a"
        >
          <FaTwitter className="social-icon" />
        </a>

        <a
          href="https://www.linkedin.com/company/aoe"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-a"
        >
          <FaLinkedinIn className="social-icon" />
        </a>

        <a
          href="https://www.xing.com/company/aoe"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-a"
        >
          <FaXing className="social-icon" />
        </a>

        <a
          href="https://www.instagram.com/aoepeople"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-a"
        >
          <FaInstagram className="social-icon" />
        </a>

        <a
          href="https://www.youtube.com/user/aoepeople"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-a"
        >
          <FaYoutube className="social-icon" />
        </a>

        <a
          href="https://github.com/aoepeople"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-a"
        >
          <FaGithub className="social-icon" />
        </a>
      </div>
    </div>
    <div className="footer-copyright">
      <p>
        <a
          href="https://www.aoe.com/en/imprint.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Legal Information
        </a>
      </p>
    </div>
  </div>
);

export default FooterEnd;

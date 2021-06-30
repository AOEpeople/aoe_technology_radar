import React from "react";
import classNames from "classnames";
import SocialIcon from "../SocialIcon/SocialIcon";
import "./footerend.scss";
import { useMessages } from "../../context/MessagesContext";

interface Props {
  modifier?: "in-sidebar";
}

const FooterEnd: React.FC<Props> = ({ modifier }) => {
  const { socialIcons } = useMessages();

  return (
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
          {socialIcons.map(({ href, iconName }) => (
            <SocialIcon href={href} iconName={iconName} />
          ))}
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
};

export default FooterEnd;

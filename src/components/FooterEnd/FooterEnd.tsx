import classNames from "classnames";
import React from "react";

import { useMessages } from "../../context/MessagesContext";
import SocialLink from "../SocialLink/SocialLink";
import "./footerend.scss";

interface Props {
  modifier?: "in-sidebar";
}

const FooterEnd: React.FC<Props> = ({ modifier }) => {
  const {
    socialLinksLabel,
    socialLinks,
    legalInformationLink,
    legalInformationLabel,
  } = useMessages();

  return (
    <div
      className={classNames("footer-end", {
        [`footer-end__${modifier}`]: modifier,
      })}
    >
      <div className="footer-social">
        {socialLinks && (
          <>
            <div className="footer-social__label">
              <p>{socialLinksLabel ?? "Follow us:"}</p>
            </div>
            <div className="footer-social__links">
              {socialLinks.map(({ href, iconName }) => (
                <SocialLink href={href} iconName={iconName} key={iconName} />
              ))}
            </div>
          </>
        )}
      </div>

      {legalInformationLink && (
        <div className="footer-copyright">
          <p>
            <a
              href={legalInformationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {legalInformationLabel || "Legal Information"}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default FooterEnd;

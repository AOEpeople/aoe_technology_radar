import classNames from "classnames";
import React from "react";

import { assetUrl, getItemPageNames, isMobileViewport } from "../../config";
import { useMessages } from "../../context/MessagesContext";
import { Item } from "../../model";
import { sanitize } from "../../sanitize";
import Branding from "../Branding/Branding";
import FooterEnd from "../FooterEnd/FooterEnd";
import "./footer.scss";

interface Props {
  items: Item[];
  pageName: string;
}

const Footer: React.FC<Props> = ({ items, pageName }) => {
  const { footerFootnote } = useMessages();

  return (
    <div
      className={classNames("footer", {
        "is-hidden":
          !isMobileViewport() && getItemPageNames(items).includes(pageName),
      })}
    >
      {footerFootnote && (
        <Branding
          modifier="footer"
          logoContent={
            <img
              src={assetUrl("logo.svg")}
              width="150px"
              height="60px"
              alt=""
            />
          }
        >
          <div
            className="footnote"
            dangerouslySetInnerHTML={sanitize(footerFootnote)}
          ></div>
        </Branding>
      )}

      <FooterEnd />
    </div>
  );
};

export default Footer;

import React from "react";
import classNames from "classnames";
import Branding from "../Branding/Branding";
import FooterEnd from "../FooterEnd/FooterEnd";
import { assetUrl, getItemPageNames, isMobileViewport } from "../../config";
import { Item } from "../../model";
import "./footer.scss";
import { useMessages } from "../../context/MessagesContext";

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
          <span className="footnote">{footerFootnote}</span>
        </Branding>
      )}

      <FooterEnd />
    </div>
  );
};

export default Footer;

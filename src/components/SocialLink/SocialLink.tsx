import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaXing,
  FaYoutube,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

const icons = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  linkedIn: FaLinkedinIn,
  xing: FaXing,
  instagram: FaInstagram,
  youtube: FaYoutube,
  github: FaGithub,
};

export interface Props {
  href: string;
  iconName: keyof typeof icons;
}

const SocialLink: React.FC<Props> = ({ href, iconName }) => {
  const Icon = icons[iconName];

  if (Icon) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon-a"
        aria-label={iconName}
      >
        <Icon className="social-icon" />
      </a>
    );
  }
  console.error(`The iconname is unknown: ${iconName}`);
  return null;
};

export default SocialLink;

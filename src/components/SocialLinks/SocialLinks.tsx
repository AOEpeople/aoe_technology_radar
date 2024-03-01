import styles from "./SocialLinks.module.css";

import {
  SocialFacebook,
  SocialGithub,
  SocialInstagram,
  SocialLinkedin,
  SocialX,
  SocialXing,
  SocialYoutube,
} from "@/components/Icons";
import { getSocialLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
}

function getIcon(name: string) {
  switch (name.toLowerCase()) {
    case "facebook":
      return SocialFacebook;
    case "github":
      return SocialGithub;
    case "instagram":
      return SocialInstagram;
    case "linkedin":
      return SocialLinkedin;
    case "x":
      return SocialX;
    case "xing":
      return SocialXing;
    case "youtube":
      return SocialYoutube;
    default:
      return null;
  }
}

export function SocialLinks({ className }: SocialLinksProps) {
  const links = getSocialLinks();
  return (
    <ul className={cn(styles.links, className)}>
      {links.map((link, i) => {
        const Icon = getIcon(link.icon);
        return (
          Icon && (
            <li key={i} className={styles.link}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {Icon && <Icon className={styles.icon} />}
              </a>
            </li>
          )
        );
      })}
    </ul>
  );
}

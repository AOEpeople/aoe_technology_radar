import styles from "./Footer.module.css";

import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { getAppName, getFooterLinks, getLabel, getLogoUrl } from "@/lib/data";

export function Footer() {
  const logoUrl = getLogoUrl();
  const footerLinks = getFooterLinks();
  return (
    <div className={styles.footer}>
      <div className={styles.branding}>
        <img src={logoUrl} className={styles.logo} alt={getAppName()} />
        <p className={styles.description}>{getLabel("footer")}</p>
        <SocialLinks className={styles.socialLinks} />
      </div>
      <div className={styles.footerLinks}>
        {footerLinks.map(({ url, label }, i) => (
          <a key={url} href={url} className={styles.footerLink} target="_blank">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

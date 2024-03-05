import logo from "../../../public/logo.svg";
import styles from "./Footer.module.css";

import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { getAppName, getImprintUrl, getLabel } from "@/lib/data";

export function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.branding}>
        <img src={logo.src} className={styles.logo} alt={getAppName()} />
        <p className={styles.description}>{getLabel("footer")}</p>
        <SocialLinks className={styles.socialLinks} />
      </div>
      <a href={getImprintUrl()} className={styles.imprint} target="_blank">
        {getLabel("imprint")}
      </a>
    </div>
  );
}

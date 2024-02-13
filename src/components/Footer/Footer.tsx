import logo from "../../../public/logo.svg";
import styles from "./Footer.module.css";

import { getAppName, getMessages } from "@/lib/data";

export function Footer() {
  const appName = getAppName();
  const { footerFootnote } = getMessages();

  return (
    <div className={styles.footer}>
      <div className={styles.branding}>
        <img src={logo.src} className={styles.logo} alt={appName} />
        <p className={styles.description}>{footerFootnote}</p>
      </div>
    </div>
  );
}

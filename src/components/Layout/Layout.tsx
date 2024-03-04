import { Roboto } from "next/font/google";
import { FC, ReactNode } from "react";

import styles from "./Layout.module.css";

import { Footer } from "@/components/Footer/Footer";
import { Logo } from "@/components/Logo/Logo";
import { Navigation } from "@/components/Navigation/Navigation";
import { cn } from "@/lib/utils";

const font = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export type LayoutClass = "default" | "full";

interface LayoutProps {
  children: ReactNode;
  layoutClass?: LayoutClass;
}

export const Layout: FC<LayoutProps> = ({
  children,
  layoutClass = "default",
}) => {
  return (
    <div
      id="layout"
      className={cn(styles.layout, font.className, styles[layoutClass])}
    >
      <header className={cn(styles.container, styles.header)}>
        <Logo />
        <Navigation />
      </header>
      <main className={cn(styles.content)}>{children}</main>
      <footer className={cn(styles.container, styles.footer)}>
        <Footer />
      </footer>
    </div>
  );
};

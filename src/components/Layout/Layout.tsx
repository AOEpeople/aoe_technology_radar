import { Roboto } from "next/font/google";
import type { FC, ReactNode } from "react";

import styles from "./Layout.module.css";

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
    <div className={cn(styles.layout, font.className, styles[layoutClass])}>
      <header className={cn(styles.container, styles.header)}>
        <Logo />
        <Navigation />
      </header>
      <main className={cn(styles.content)}>{children}</main>
      <footer className={cn(styles.container, styles.header)}>
        <h2>Footer</h2>
      </footer>
    </div>
  );
};

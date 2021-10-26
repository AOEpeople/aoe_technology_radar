import { createContext, FC, useContext } from "react";
import { Props as SocialLink } from "../../components/SocialLink/SocialLink";

interface Quadrant {
  name: string;
  description: string;
}

interface Ring {
  name: string;
  description: string;
}

interface Paragraph {
  headline: string;
  values: string[];
}

interface PageHelp {
  paragraphs: Paragraph[];
  quadrants: Quadrant[];
  rings: Ring[];
  sourcecodeLink?: {
    href: string;
    name: string;
    description: string;
  };
}

interface PageOverview {
  title: string;
}

interface PageItem {
  quadrantOverview: string;
}

export interface Messages {
  footerFootnote?: string;
  socialLinks?: SocialLink[];
  legalInformationLink?: string;
  pageHelp?: PageHelp;
  pageOverview?: PageOverview;
  pageItem?: PageItem;
  searchPlaceholder?: string;
}

const MessagesContext = createContext<Messages | undefined>(undefined);

export const MessagesProvider: FC<{ messages?: Messages }> = ({
  messages,
  children,
}) => (
  <MessagesContext.Provider value={messages}>
    {children}
  </MessagesContext.Provider>
);

export const useMessages = () => useContext(MessagesContext) || {};

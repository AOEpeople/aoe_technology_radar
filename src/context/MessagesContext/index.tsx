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
  quadrantsPreDescription?: string;
  quadrants: Quadrant[];
  rings: Ring[];
  ringsPreDescription?: string;
  sourcecodeLink?: {
    href: string;
    name: string;
    description: string;
  };
  headlinePrefix?: string
}

interface PageOverview {
  title: string;
}

interface PageItem {
  quadrantOverview: string;
}

interface PageIndex {
  publishedLabel: string;
}

export interface Messages {
  footerFootnote?: string;
  socialLinks?: SocialLink[];
  legalInformationLink?: string;
  pageHelp?: PageHelp;
  pageOverview?: PageOverview;
  pageItem?: PageItem;
  pageIndex?: PageIndex;
  searchLabel?: string;
  searchPlaceholder?: string;
  revisionsText?: string;
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

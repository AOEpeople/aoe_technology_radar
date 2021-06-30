import { createContext, FC, useContext } from "react";
import { Props as SocialIcon } from "../../components/SocialIcon/SocialIcon";

interface Quadrant {
  name: string;
  description: string;
}

interface Ring {
  name: string;
  description: string;
}

interface PageHelp {
  introduction: string[];
  whatIsTheRadar: string[];
  howItIsCreated: string[];
  howShouldItBeUsed: string[];
  quadrants: Quadrant[];
  rings: Ring[];
}

export interface Messages {
  footerFootnote: string;
  socialIcons: SocialIcon[];
  pageHelp: PageHelp;
}

const MessagesContext = createContext<Messages | undefined>(undefined);

export const MessagesProvider: FC<{ messages: Messages }> = ({
  messages,
  children,
}) => (
  <MessagesContext.Provider value={messages}>
    {children}
  </MessagesContext.Provider>
);

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};

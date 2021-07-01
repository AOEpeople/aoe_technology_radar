import React from "react";
import HeroHeadline from "../HeroHeadline/HeroHeadline";
import Fadeable from "../Fadeable/Fadeable";
import SetTitle from "../SetTitle";
import { radarName } from "../../config";
import { useMessages } from "../../context/MessagesContext";

interface Props {
  leaving: boolean;
  onLeave: () => void;
}

const PageHelp: React.FC<Props> = ({ leaving, onLeave }) => {
  const { pageHelp } = useMessages();

  if (pageHelp) {
    const { paragraphs, quadrants, rings, sourcecodeLink } = pageHelp;
    return (
      <Fadeable leaving={leaving} onLeave={onLeave}>
        <SetTitle title={"How to use the " + radarName} />
        <HeroHeadline>How to use the {radarName}</HeroHeadline>
        <div className="fullpage-content">
          {paragraphs.map(({ headline, values }) => (
            <React.Fragment key={headline}>
              <h3>{headline}</h3>
              {values.map((element, index) => (
                <p key={index}>{element}</p>
              ))}
            </React.Fragment>
          ))}

          <p>The quadrants are:</p>
          <ul>
            {quadrants.map(({ name, description }) => (
              <li key={name}>
                <strong>{name}:</strong> {description}
              </li>
            ))}
          </ul>

          <p>Each of the items is classified in one of these rings:</p>
          <ul>
            {rings.map(({ name, description }) => (
              <li key={name}>
                <strong>{name}:</strong> {description}
              </li>
            ))}
          </ul>

          {sourcecodeLink && (
            <p>
              {`${sourcecodeLink.description} `}
              <a
                href={sourcecodeLink.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sourcecodeLink.name}
              </a>
            </p>
          )}
        </div>
      </Fadeable>
    );
  }

  return null;
};

export default PageHelp;

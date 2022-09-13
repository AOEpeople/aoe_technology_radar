import React from "react";

import { radarName } from "../../config";
import { useMessages } from "../../context/MessagesContext";
import { sanitize } from "../../sanitize";
import Fadeable from "../Fadeable/Fadeable";
import HeroHeadline from "../HeroHeadline/HeroHeadline";
import SetTitle from "../SetTitle";

interface Props {
  leaving: boolean;
  onLeave: () => void;
}

const PageHelp: React.FC<Props> = ({ leaving, onLeave }) => {
  const { pageHelp } = useMessages();

  if (pageHelp) {
    const {
      paragraphs,
      quadrants,
      rings,
      sourcecodeLink,
      headlinePrefix,
      quadrantsPreDescription,
      ringsPreDescription,
    } = pageHelp;
    const title = `${headlinePrefix || "How to use the"} ${radarName}`;
    return (
      <Fadeable leaving={leaving} onLeave={onLeave}>
        <SetTitle title={title} />
        <HeroHeadline>{title}</HeroHeadline>
        <div className="fullpage-content">
          {paragraphs.map(({ headline, values }) => (
            <React.Fragment key={headline}>
              <h3>{headline}</h3>
              {values.map((element, index) => {
                return (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={sanitize(element)}
                  ></p>
                );
              })}
            </React.Fragment>
          ))}

          <p>{quadrantsPreDescription ?? "The quadrants are:"}</p>
          <ul>
            {quadrants.map(({ name, description }) => (
              <li key={name}>
                <strong>{name}:</strong>{" "}
                <span
                  dangerouslySetInnerHTML={sanitize(description, {})}
                ></span>
              </li>
            ))}
          </ul>

          <p>
            {ringsPreDescription ??
              "Each of the items is classified in one of these rings:"}
          </p>
          <ul>
            {rings.map(({ name, description }) => (
              <li key={name}>
                <strong>{name}:</strong>{" "}
                <span
                  dangerouslySetInnerHTML={sanitize(description, {})}
                ></span>
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

import { useEffect, useState, useMemo } from "react";
import {
  Animation,
  AnimationConfig as AbstractAnimationConfig,
  AnimationStates,
  createAnimation,
  createAnimationRunner,
} from "../../animation";
import { Item } from "../../model";

interface Props {
  itemsInRing: Item[];
  featuredItemsInRing: Item[];
  nonFeaturedItemsInRing: Item[];
  leaving: boolean;
  onLeave: () => void;
}

export const useAnimations = ({
  itemsInRing,
  featuredItemsInRing,
  nonFeaturedItemsInRing,
  leaving,
  onLeave,
}: Props) => {
  interface AnimationConfig extends AbstractAnimationConfig {
    background: Animation;
    navHeader: Animation;
    text: Animation;
    featuredItems: Animation[];
    nonFeaturedItems: Animation[];
    footer: Animation;
  }

  type AnimationNames = keyof AnimationConfig;

  const animationsIn: AnimationConfig = useMemo(
    () => ({
      background: createAnimation(
        {
          transform: "translateX(calc((100vw - 1200px) / 2 + 800px))",
          transition: "transform 450ms cubic-bezier(0.24, 1.12, 0.71, 0.98)",
        },
        {
          transition: "transform 450ms cubic-bezier(0.24, 1.12, 0.71, 0.98)",
          transform: "translateX(0)",
        },
        0
      ),
      navHeader: createAnimation(
        {
          transform: "translateX(-40px)",
          opacity: "0",
        },
        {
          transition: "opacity 150ms ease-out, transform 300ms ease-out",
          transform: "translateX(0px)",
          opacity: "1",
        },
        300
      ),
      text: createAnimation(
        {
          transform: "translateY(-20px)",
          opacity: "0",
        },
        {
          transition: "opacity 150ms ease-out, transform 300ms ease-out",
          transform: "translateY(0px)",
          opacity: "1",
        },
        600
      ),
      featuredItems: featuredItemsInRing.map((item, i) =>
        createAnimation(
          {
            transform: "translateX(-40px)",
            opacity: "0",
          },
          {
            transition: "opacity 150ms ease-out, transform 300ms ease-out",
            transform: "translateX(0px)",
            opacity: "1",
          },
          400 + 100 * i
        )
      ),
      nonFeaturedItems: nonFeaturedItemsInRing.map((item, i) =>
        createAnimation(
          {
            transform: "translateX(-40px)",
            opacity: "0",
          },
          {
            transition: "opacity 150ms ease-out, transform 300ms ease-out",
            transform: "translateX(0px)",
            opacity: "1",
          },
          400 + 100 * (featuredItemsInRing.length + i)
        )
      ),
      footer: createAnimation(
        {
          transition: "opacity 150ms ease-out, transform 300ms ease-out",
          transform: "translateX(-40px)",
          opacity: "0",
        },
        {
          transition: "opacity 150ms ease-out, transform 300ms ease-out",
          transform: "translateX(0px)",
          opacity: "1",
        },
        600 + itemsInRing.length * 100
      ),
    }),
    [itemsInRing, featuredItemsInRing, nonFeaturedItemsInRing]
  );

  const animationsOut: AnimationConfig = useMemo(
    () => ({
      background: createAnimation(
        animationsIn.background.stateB,
        animationsIn.background.stateA,
        300 + itemsInRing.length * 50
      ),
      navHeader: createAnimation(
        animationsIn.navHeader.stateB,
        {
          transition: "opacity 150ms ease-out, transform 300ms ease-out",
          transform: "translateX(40px)",
          opacity: "0",
        },
        0
      ),
      text: createAnimation(
        animationsIn.text.stateB,
        {
          transform: "translateY(20px)",
          transition: "opacity 150ms ease-out, transform 300ms ease-out",
          opacity: "0",
        },
        0
      ),
      featuredItems: featuredItemsInRing.map((item, i) =>
        createAnimation(
          animationsIn.featuredItems[i].stateB,
          {
            transition: "opacity 150ms ease-out, transform 300ms ease-out",
            transform: "translateX(40px)",
            opacity: "0",
          },
          100 + 50 * i
        )
      ),
      nonFeaturedItems: nonFeaturedItemsInRing.map((item, i) =>
        createAnimation(
          animationsIn.nonFeaturedItems[i].stateB,
          {
            transition: "opacity 150ms ease-out, transform 300ms ease-out",
            transform: "translateX(40px)",
            opacity: "0",
          },
          100 + 50 * (featuredItemsInRing.length + i)
        )
      ),
      footer: createAnimation(
        animationsIn.text.stateB,
        {
          transition: "opacity 150ms ease-out, transform 300ms ease-out",
          transform: "translateX(40px)",
          opacity: "0",
        },
        200 + itemsInRing.length * 50
      ),
    }),
    [itemsInRing, featuredItemsInRing, nonFeaturedItemsInRing, animationsIn]
  );

  const [animations, setAnimations] = useState<AnimationStates>(() => {
    return leaving ? createAnimationRunner(animationsIn).getState() : {};
  });

  const [stateLeaving, setStateLeaving] = useState(leaving);

  useEffect(() => {
    if (!stateLeaving && leaving) {
      let animationRunner = createAnimationRunner(animationsOut, () =>
        setAnimations(animationRunner.getState)
      );
      animationRunner.run();
      animationRunner.awaitAnimationComplete(onLeave);
      setStateLeaving(true);
    }
    if (stateLeaving && !leaving) {
      let animationRunner = createAnimationRunner(animationsIn, () =>
        setAnimations(animationRunner.getState)
      );
      animationRunner.run();
      setStateLeaving(false);
    }
  }, [stateLeaving, leaving, animationsIn, animationsOut, onLeave]);

  const getAnimationStates = (name: AnimationNames) => animations[name];

  const getAnimationState = (name: AnimationNames) => {
    const animations = getAnimationStates(name);
    if (animations === undefined || animations.length === 0) {
      return undefined;
    }
    return animations[0];
  };

  return {
    getAnimationStates,
    getAnimationState,
  };
};

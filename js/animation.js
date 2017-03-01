export const createAnimationController = (animations, component) => {
  return {
    animations,
    start: () => {
      Object.entries(animations).map(([name, animation]) => animation.run((state) => {
        component.setState({
          ...component.state,
          [name]: state,
        });
      }));
    },
    prepare: () => {
      Object.entries(animations).map(([name, animation]) => animation.prepare((state) => {
        component.setState({
          ...component.state,
          [name]: state,
        });
      }));
    }
  };
}

export const createAnimation = (stateA, stateB, delay) => ({
  stateA,
  stateB,
  delay,
});

const getAnimationState = (animation, stateName = 'stateA') => {
  if (animation instanceof Array) {
    return animation.map(a => getAnimationState(a, stateName));
  }

  return animation[stateName];
};

const getMaxTransitionTime = (transition) => {
  const re = /(\d+)ms/g;
  const times = [];
  let matches;
  while ((matches = re.exec(transition)) != null) {
    times.push(parseInt(matches[1], 10));
  }
  return Math.max.apply(null, times);
};

const getAnimationDuration = (animation) => {
  if (animation instanceof Array) {
    return animation.reduce((maxDuration, a) => {
      const duration = getAnimationDuration(a);
      if (duration > maxDuration) {
        return duration;
      }
      return maxDuration;
    }, 0);
  }

  const state = animation.stateB;
  const maxTransition = state.transition ? getMaxTransitionTime(state.transition) : 0;
  return maxTransition + animation.delay;
};

const getMaxAnimationsDuration = (animations) => (
  getAnimationDuration(Object.values(animations))
);

export const createAnimationRunner = (animations, subscriber) => {
  let state = Object.entries(animations).reduce((state, [name, animation]) => ({
    ...state,
    [name]: getAnimationState(animation),
  }), {});

  const animationsDuration = getMaxAnimationsDuration(animations);

  const animate = (name, animation) => {
    if (animation instanceof Array) {
      animation.map((a, index) => {
        window.requestAnimationFrame(() => {
          window.setTimeout(() => {
            state = {
              ...state,
              [name]: [
                ...(state[name].slice(0, index)),
                a.stateB,
                ...(state[name].slice(index + 1, state[name].length)),
              ],
            };
            subscriber();
          }, a.delay);
        });
      });
    } else {
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          state = {
            ...state,
            [name]: animation.stateB,
          };
          subscriber();
        }, animation.delay);
      });
    }
  }

  return {
    getState() {
      return state;
    },
    run() {
      Object.entries(animations).forEach(([name, animation]) => {
        animate(name, animation)
      });
    },
    awaitAnimationComplete(callback) {
      window.setTimeout(callback, animationsDuration);
    },
  }
}

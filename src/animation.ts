type Animation = {
  stateA: React.CSSProperties
  stateB: React.CSSProperties
  delay: number
  run?(callback: (state: any) => any): any // todo fix
  prepare?(callback: (state: any) => any): any // todo fix
}

type AnimationController = {}

type AnimationRunner = {
  getState(): any
  run(): any
  awaitAnimationComplete(callback: () => void): any
}

export const createAnimationController = (animations: {[k: string]: Animation}, component: any): AnimationController => {
  return {
    animations,
    start: () => {
      Object.entries(animations).map(([name, animation]) => animation.run && animation.run((state) => {
        component.setState({
          ...component.state,
          [name]: state,
        });
      }));
    },
    prepare: () => {
      Object.entries(animations).map(([name, animation]) => animation.prepare && animation.prepare((state) => {
        component.setState({
          ...component.state,
          [name]: state,
        });
      }));
    }
  };
}

export const createAnimation = (stateA: React.CSSProperties, stateB: React.CSSProperties, delay: number): Animation => ({
  stateA,
  stateB,
  delay,
});

const getAnimationState = (animation: Animation | Animation[], stateName: 'stateA' | 'stateB' = 'stateA'): React.CSSProperties => {
  if (animation instanceof Array) {
    return animation.map(a => getAnimationState(a, stateName))[0]; // todo fix
  }
  
  return animation[stateName];
};

const getMaxTransitionTime = (transition: string) => {
  const re = /(\d+)ms/g;
  const times: number[] = [];
  let matches;
  while ((matches = re.exec(transition)) != null) {
    times.push(parseInt(matches[1], 10));
  }
  return Math.max(...times);
};

const getAnimationDuration = (animation: Animation | Animation[]): number => {
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

const getMaxAnimationsDuration = (animations: {[k: string]: Animation} | Animation[]) => (
  getAnimationDuration(Object.values(animations))
);

export const createAnimationRunner = (animations: {[k: string]: Animation} | Animation[], subscriber: () => void = () => {}):AnimationRunner => {
  let state = Object.entries(animations).reduce((state, [name, animation]) => ({
    ...state,
    [name]: getAnimationState(animation),
  }), {});

  const animationsDuration = getMaxAnimationsDuration(animations);

  const animate = (name: string, animation: Animation) => {
    if (animation instanceof Array) {
      animation.forEach((a, index) => {
        window.requestAnimationFrame(() => {
          window.setTimeout(() => {
            state = {
              ...state,
              [name]: [
                // ...(state[name]?.slice(0, index)),  // todo fix
                a.stateB,
                // ...(state[name]?.slice(index + 1, state[name].length)),  // todo fix
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

import React from 'react';

export type Animations = {
    [k: string]: Animation[]
}

export type AnimationStates = {
    [k: string]: React.CSSProperties[]
}

type Animation = {
    stateA: React.CSSProperties
    stateB: React.CSSProperties
    delay: number
    run?(callback: (state: any) => any): any // todo fix
    prepare?(callback: (state: any) => any): any // todo fix
}

export type AnimationRunner = {
    getState(): AnimationStates
    run(): any
    awaitAnimationComplete(callback: () => void): any
}

export const createAnimation = (stateA: React.CSSProperties, stateB: React.CSSProperties, delay: number): Animation => ({
    stateA,
    stateB,
    delay,
});

const getAnimationStates = (animations: Animation[], stateName: 'stateA' | 'stateB' = 'stateA'): React.CSSProperties[] => {
    return animations.map(animation => animation[stateName]);
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

const getMaxAnimationsDuration = (animations: Animations) => (
    Math.max(...Object.values(animations).map(animations => getAnimationDuration(Object.values(animations))))
);

export const createAnimationRunner = (animationsIn: { [k: string]: (Animation | Animation[]) }, subscriber: () => void = () => {
}): AnimationRunner => {
    const animations = Object.entries(animationsIn).reduce((state, [name, animation]) => ({
        ...state,
        [name]: animation instanceof Array ? animation : [animation] as Animation[],
    }), {} as Animations);

    let state = Object.entries(animations).reduce((state, [name, animation]) => ({
        ...state,
        [name]: getAnimationStates(animation),
    }), {} as AnimationStates);

    const animationsDuration = getMaxAnimationsDuration(animations);

    const animate = (name: string, animation: Animation[]) => {
        animation.forEach((a, index) => {
            window.requestAnimationFrame(() => {
                window.setTimeout(() => {
                    state = {
                        ...state,
                        [name]: [
                            ...(state[name]?.slice(0, index)),
                            a.stateB,
                            ...(state[name]?.slice(index + 1, state[name].length)),
                        ],
                    };
                    subscriber();
                }, a.delay);
            });
        });
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

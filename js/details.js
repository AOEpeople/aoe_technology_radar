import Vue from 'vue';
import applyPjax from './pjax';


const af = (() => {
  if (!window.requestAnimationFrame) {
    return (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      ((callback, element) => {
        window.setTimeout( callback, 1000 / 60 );
      })
    );
  }
  return window.requestAnimationFrame;
})();

const animation = (steps) => {
  steps.reduce((total, [timeout, step]) => {
    af(() => {
      window.setTimeout(step, total + timeout)
    });
    return total + timeout;
  }, 0);
}

const initDetails = (element, fromPjax) => {
  if (fromPjax !== true) {
    return;
  }

  element.classList.add('animate');
  element.classList.add('animate--curtain');
  element.classList.add('animate--invisible-content');
  element.classList.add('animate--invisible-nav');
  animation([
    [0, () => {
      element.classList.remove('animate--curtain');
    }],
    [350, () => {
      element.classList.remove('animate--invisible-nav');
    }],
    [150, () => {
      element.classList.remove('animate--invisible-content');
    }],
  ])
};

export default initDetails;

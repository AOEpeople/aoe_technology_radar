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
  steps.map(([timeout, step]) => {
    af(() => {
      window.setTimeout(step, timeout)
    });
  });
}

const createAnimation = (stateA, stateB, delay) => ({
  style: stateA,
  prepare(target) {
    this.style = stateA;
  },
  run(target) {
    af(() => {
      window.setTimeout(() => {
        this.style = stateB;
      }, delay)
    });
  },
});

const initDetails = (element, fromPjax) => {

  if(!fromPjax) {
    return;
  }

  const items = JSON.parse(element.getAttribute('data-items'));

  const details = new Vue({
    el: element,
    template: element.outerHTML,
    data: {
      background: createAnimation({
          transform: 'translateX(calc((100vw - 1200px) / 2 + 800px))',
        }, {
          transform: 'translateX(0)',
        },
        0
      ),
      navHeader: createAnimation({
          transform: 'translateY(-20px)',
          opacity: '0',
        }, {
          transform: 'translateY(0px)',
          opacity: '1',
        },
        300
      ),
      text: createAnimation({
          transform: 'translateY(-20px)',
          opacity: '0',
        }, {
          transform: 'translateY(0px)',
          opacity: '1',
        },
        600
      ),
      items: items.map((item, i) => (createAnimation({
          transform: 'translateY(-40px)',
          opacity: '0',
        }, {
          transform: 'translateY(0px)',
          opacity: '1',
        },
        200 + 100 * i
      )))
    },
    methods: {
      createAnimation
    },
    mounted() {
      applyPjax();
      this.background.run();
      this.navHeader.run();
      this.text.run();
      this.items.map(item => item.run());
    },
    updated() {
      applyPjax();
    },
  });
};

export default initDetails;

import filter from './filter';
import details from './details';
import applyPjax from './pjax';

const enhanceComponent = (selector, enhancer) => {
  const $filter = [].slice.call(document.querySelectorAll(selector));
  $filter.map(enhancer);
}

const enhanceComponents = () => {
  enhanceComponent('.js--filter', filter);
  enhanceComponent('.js--details', details);
}

applyPjax();

enhanceComponents();
document.addEventListener("pjax:success", enhanceComponents);

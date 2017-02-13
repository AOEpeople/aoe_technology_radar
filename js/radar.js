import filter from './filter';
import applyPjax from './pjax';

const enhanceComponent = (selector, enhancer) => {
  const $filter = [].slice.call(document.querySelectorAll(selector));
  $filter.map(enhancer);
}

const enhanceComponents = () => {
  enhanceComponent('.js--filter', filter);
}

applyPjax();

enhanceComponents();
document.addEventListener("pjax:success", enhanceComponents);

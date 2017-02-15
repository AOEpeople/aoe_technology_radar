import filter from './filter';
import details from './details';
import applyPjax from './pjax';

const enhanceComponent = (selector, enhancer, fromPjax = false) => {
  const $filter = [].slice.call(document.querySelectorAll(selector));
  $filter.map((e) => enhancer(e, fromPjax));
}

const enhanceComponents = (fromPjax) => {
  enhanceComponent('.js--filter', filter, fromPjax);
  enhanceComponent('.js--details', details, fromPjax);
}

applyPjax();

enhanceComponents();
document.addEventListener("pjax:success", () => enhanceComponents(true));

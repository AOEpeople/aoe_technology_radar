import filter from './filter';

const enhanceComponent = (selector, enhancer) => {
  const $filter = [].slice.call(document.querySelectorAll(selector));
  $filter.map(enhancer);
}

enhanceComponent('.js--filter', filter);

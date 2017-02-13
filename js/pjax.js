import Pjax from 'pjax';

const applyPjax = () => {
  new Pjax({
    elements: '.js--body a',
    selectors: ['title', '.js--body'],
  });
};

export default applyPjax;

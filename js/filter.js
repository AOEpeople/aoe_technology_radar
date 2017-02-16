import Vue from 'vue';
import applyPjax from './pjax';


const initFilter = (element) => {
  const index = JSON.parse(element.getAttribute('data-index'));

  const filter = new Vue({
    el: element,
    template: element.outerHTML,
    data: {
      ring: 'all',
      index,
    },
    methods: {
      setRing(ring, event) {
        if (event) event.preventDefault()
        this.ring = ring;
      },
      isRingVisible(ring) {
        return this.ring === 'all' || ring === this.ring;
      },
      isGroupVisible(letter) {
        const itemsInLetter = this.index[letter] || [];
        const visibleItems = itemsInLetter.filter((item) => this.isRingVisible(item.ring));
        return visibleItems.length > 0;
      },
    },
    mounted() {
      applyPjax();
    },
    updated() {
      applyPjax();
    },
  });
};

export default initFilter;

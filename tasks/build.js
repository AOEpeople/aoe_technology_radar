import { createRadar } from '../common/radar';
import { save } from '../common/file';
import { getPageNames } from '../common/config';
import { renderPage } from '../js/server';

(async () => {
  try {
    const radar = await createRadar();

    getPageNames(radar).map(pageName => {
      const pageHtml = renderPage(radar, pageName);
      save(pageHtml, `${pageName}.html`);
    });

    console.log('Built radar');
  } catch (e) {
    console.error('error:', e);
  }
})();

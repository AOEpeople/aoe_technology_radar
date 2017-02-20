import {
  createRadar,
  groupByQuadrants,
  outputRadar,
} from '../common/radar';
import { save } from '../common/file';
import { getPageNames } from '../common/config';
import { renderPage } from '../js/server';


(async () => {
  try {
    const radar = await createRadar();

    getPageNames(radar).map((pageName) => {
      const pageHtml = renderPage(radar, pageName);
      console.log(pageHtml);
      save(pageHtml, `${pageName}.html`);
    });

    // pages.map((pageHtml) => {
    //   save(pageHtml, `${pageName}.html`)
    // });
    // console.log(pages);
    // outputRadar(radar);

    // const radarByQuadrants = groupByQuadrants(radar);
    // createStatic(radar);

    console.log('Built radar');
    // console.log(JSON.stringify(radar, null, 2));
  } catch(e) {
    console.error('error:', e);
  }
})()

import { createRadar } from "./radar";
import { save } from "./file";


export const r = (async () => {
    try {
        console.log('start')
      const radar = await createRadar();

      // console.log(radar);

      save(JSON.stringify(radar), 'radar.json')
  
      // getPageNames(radar).map(pageName => {
      //   // const pageHtml = renderPage(radar, pageName);
      //   // save(pageHtml, `${pageName}.html`);
      //   save([pageName, radar], `${pageName}.html`)
      // });
  
      console.log('Built radar');
    } catch (e) {
      console.error('error:', e);
    }
  })();
  
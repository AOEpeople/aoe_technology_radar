import {
  createRadar,
  outputRadar,
} from './radar';
import {
  createStatic,
} from './static';


(async () => {
  try {
    const radar = await createRadar();
    outputRadar(radar);
    createStatic(radar);

    console.log('Radar build!');
    console.log(JSON.stringify(radar, null, 2));
  } catch(e) {
    console.error('error:', e);
  }
})()

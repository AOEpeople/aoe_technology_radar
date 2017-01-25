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

    console.log('Built radar');
    // console.log(JSON.stringify(radar, null, 2));
  } catch(e) {
    console.error('error:', e);
  }
})()

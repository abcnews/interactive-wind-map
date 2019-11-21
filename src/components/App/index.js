import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import '../../mapbox-gl.scss';
import Arrow from '../Arrow';
import Legend from '../Legend';
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE,
  DATA_URL_WITH_ACCESS_TOKEN,
  INITIAL_WINDOW_WIDTH,
  INITIALLY_SMALL_VIEWPORT,
  STATES
} from './constants';
import styles from './styles.scss';

let nextId = 0;

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default function App({ state }) {
  const stateData = STATES[state];
  const rootEl = document.createElement('div');

  if (!stateData) {
    console.error(new Error(`Unrecognised state: ${state}`));

    return rootEl;
  }

  const mapboxMapEl = document.createElement('div');
  const mapboxMapId = `${styles.map}_${nextId++}`;

  mapboxMapEl.id = mapboxMapId;
  mapboxMapEl.className = styles.map;
  rootEl.className = styles.root;
  rootEl.appendChild(mapboxMapEl);
  rootEl.appendChild(new Legend().el);

  const mapReady = new Promise((resolve, reject) => {
    (function initMapIfMounted() {
      if (!rootEl.parentElement) {
        return setTimeout(initMapIfMounted, 100);
      }

      const containerWidth = rootEl.getBoundingClientRect().width;
      const size = containerWidth < 640 ? 'sm' : containerWidth < 952 ? 'md' : 'lg';
      const mapConfig = stateData[`map-${size}`] || stateData.map;

      const map = new mapboxgl.Map(
        Object.assign(
          {
            container: mapboxMapId,
            interactive: false,
            maxZoom: 7,
            minZoom: 3,
            style: MAPBOX_STYLE
          },
          mapConfig
        )
      );

      map.scrollZoom.disable();
      map.doubleClickZoom.disable();
      map.on('load', () => resolve(map));
      window.__map = map;

      setTimeout(() => map.resize(), 1000);
    })();
  });

  const dataReady = fetch(DATA_URL_WITH_ACCESS_TOKEN).then(response => response.json());

  Promise.all([mapReady, dataReady]).then(values => {
    const [map, data] = values;

    data
      .filter(datum => datum[0] === state)
      .forEach(datum => {
        const [, lat, lon, dir, speed] = datum;

        new mapboxgl.Marker({ element: new Arrow({ speed, dir }).el }).setLngLat([lon, lat]).addTo(map);
      });
  });

  this.el = rootEl;
}

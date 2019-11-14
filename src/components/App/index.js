import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import Arrow from '../Arrow';
import Legend from '../Legend';
import styles from './styles.scss';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoibmV3cy1vbjFpbmUiLCJhIjoiY2pjazE3OTl3MDUyeTJ3cGl2NWRxcDhpNyJ9.Kw4lhAbLUk9IPazutBe28w';
const MAPBOX_STYLE = 'mapbox://styles/news-on1ine/ck2v56y390f3p1cp1jqb97b9d/draft';
const DATA_URL_WITH_ACCESS_TOKEN =
  'https://firebasestorage.googleapis.com/v0/b/windy-258800.appspot.com/o/latest.json?alt=media';

let nextId = 0;

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const INITIAL_WINDOW_WIDTH = window.innerWidth;
const INITIALLY_SMALL_VIEWPORT = INITIAL_WINDOW_WIDTH < 960;

const STATES = {
  nsw: {
    'map-sm': {
      center: [150, -32],
      zoom: 4.75
    },
    'map-md': {
      center: [147.6, -32.5],
      zoom: 5.25
    },
    'map-lg': {
      center: [147.6, -32.5],
      zoom: 5.75
    }
  },
  qld: {
    'map-sm': {
      center: [148, -21],
      zoom: 4.25
    },
    'map-md': {
      center: [148, -22.25],
      zoom: 5
    },
    'map-lg': {
      center: [150, -23],
      zoom: 5.75
    }
  },
  wa: {
    'map-sm': {
      center: [120, -24.75],
      zoom: 3.75
    },
    'map-md': {
      center: [121, -24.25],
      zoom: 4.25
    },
    'map-lg': {
      center: [121, -24.5],
      zoom: 4.75
    }
  }
};

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
            // doubleClickZoom: false,
            // dragRotate: false,
            interactive: false,
            maxZoom: 7,
            minZoom: 3,
            // scrollZoom: false,
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

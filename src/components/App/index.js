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

const STATES = {
  nsw: {
    map: {
      center: [153.93131906230678, -32.46018567916396],
      maxBounds: [
        [140.87502165784787, -37.79552214449357],
        [153.93131906230678, -26.789200285262886]
      ]
    }
  },
  qld: {
    map: {
      center: [145.54093084042734, -19.28428376444579],
      maxBounds: [
        [134.42718304764168, -29.391821066000865],
        [156.6546786332101, -8.513788739900605]
      ]
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

      const map = new mapboxgl.Map(
        Object.assign(
          {
            container: mapboxMapId,
            // interactive: false,
            maxZoom: 7,
            style: MAPBOX_STYLE,
            zoom: 5
          },
          stateData.map
        )
      );

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

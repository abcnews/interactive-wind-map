export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoibmV3cy1vbjFpbmUiLCJhIjoiY2pjazE3OTl3MDUyeTJ3cGl2NWRxcDhpNyJ9.Kw4lhAbLUk9IPazutBe28w';
export const MAPBOX_STYLE = 'mapbox://styles/news-on1ine/ck2v56y390f3p1cp1jqb97b9d/draft';
export const DATA_URL_WITH_ACCESS_TOKEN =
  'https://firebasestorage.googleapis.com/v0/b/windy-258800.appspot.com/o/latest.json?alt=media';

export const INITIAL_WINDOW_WIDTH = window.innerWidth;
export const INITIALLY_SMALL_VIEWPORT = INITIAL_WINDOW_WIDTH < 960;

export const STATES = {
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
  nt: {
    'map-sm': {
      center: [133.5, -17.5],
      zoom: 4.25
    },
    'map-md': {
      center: [133.5, -18],
      zoom: 4.75
    },
    'map-lg': {
      center: [133.5, -18],
      zoom: 5.25
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
  sa: {
    'map-sm': {
      center: [135, -32.5],
      zoom: 4.25
    },
    'map-md': {
      center: [135, -32.5],
      zoom: 5
    },
    'map-lg': {
      center: [135, -32.5],
      zoom: 5.5
    }
  },
  tas: {
    'map-sm': {
      center: [146.5, -42],
      zoom: 5.5
    },
    'map-md': {
      center: [146.5, -42],
      zoom: 6
    },
    'map-lg': {
      center: [146.5, -42],
      zoom: 6.5
    }
  },
  vic: {
    'map-sm': {
      center: [145.5, -37],
      zoom: 4.75
    },
    'map-md': {
      center: [145.5, -37],
      zoom: 5.5
    },
    'map-lg': {
      center: [145.5, -37],
      zoom: 6
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

import App from './components/App';

const containers = [];

// <div data-interactive-wind-map-root data-state="{state}" />
Array.from(document.querySelectorAll(`[data-interactive-wind-map-root][data-state]`)).forEach(el => {
  containers.push({
    el,
    state: el.getAttribute('data-state')
  });
});

// <a name="windmap{state}" /> ==> <div>
Array.from(document.querySelectorAll('a[name]'))
  .filter(el => el.name.indexOf('windmap') === 0)
  .forEach(markerEl => {
    const el = document.createElement('div');

    el.className = 'u-pull';
    markerEl.parentElement.insertBefore(el, markerEl);
    markerEl.parentElement.removeChild(markerEl);

    containers.push({
      el,
      state: markerEl.name.slice(7)
    });
  });

function init() {
  containers.forEach(({ el, state }) => el.appendChild(new App({ state }).el));
}

init();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    containers.forEach(({ el }) => el.removeChild(el.firstChild));

    try {
      init();
    } catch (err) {
      import('./components/ErrorBox').then(exports => {
        const ErrorBox = exports.default;
        containers[0].el.appendChild(new ErrorBox({ error: err }).el);
      });
    }
  });
}

if (process.env.NODE_ENV === 'development') {
  console.debug(`[interactive-wind-map] public path: ${__webpack_public_path__}`);
}

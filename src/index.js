import App from './components/App';

const PROJECT_NAME = 'interactive-wind-map';
const roots = Array.from(document.querySelectorAll(`[data-${PROJECT_NAME}-root][data-state]`));

function init() {
  roots.forEach(root => root.appendChild(new App({ state: root.getAttribute('data-state') }).el));
}

init();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    roots.forEach(root => root.removeChild(root.firstChild));

    try {
      init();
    } catch (err) {
      import('./components/ErrorBox').then(exports => {
        const ErrorBox = exports.default;
        root.appendChild(new ErrorBox({ error: err }).el);
      });
    }
  });
}

if (process.env.NODE_ENV === 'development') {
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}

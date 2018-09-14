import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.react';
import registerServiceWorker from './registerServiceWorker';
import './style.css';
import {AppContainer} from 'react-hot-loader';

// polyfill for IntersectionObserver
import 'intersection-observer';

ReactDOM.render((
  <AppContainer>
  <App />
  </AppContainer>
), document.getElementById('root'));

registerServiceWorker();

if (module.hot) {
  module.hot.accept('./app/App.react', () => {
    const NextApp = require('./app/App.react').default; // eslint-disable-line global-require
    ReactDOM.render(
    <AppContainer>
    <NextApp />
    </AppContainer>,
    document.getElementById('root')
  );
  });
}

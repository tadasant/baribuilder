import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app/App.react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// polyfill for IntersectionObserver
import 'intersection-observer';

ReactDOM.render((
  <AppContainer>
    <App/>
  </AppContainer>
), document.getElementById('root'));

registerServiceWorker();

if (module.hot) {
  module.hot.accept('./app/App.react', () => {
    const NextApp = require('./app/App.react').default; // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
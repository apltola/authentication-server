import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './index.css';
import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// const render = Component => {
//   ReactDOM.render(
//     /* <AppContainer>
//     </AppContainer>, */
//     <Component />,
//     document.getElementById('root')
//   );
// };

// render(App);

// Webpack Hot Module Replacement API
/* if (module.hot) module.hot.accept('./components/App', () => render(App)); */
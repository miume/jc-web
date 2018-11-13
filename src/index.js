import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MRoute from '../src/routes/router'
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<MRoute />, document.getElementById('root'));

serviceWorker.unregister();

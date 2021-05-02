import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import Main from './screens/index';
import Mae from './screens/mae';
import Endereco from './screens/endereco';
import reducer from './reducers/reducer';

import reportWebVitals from './reportWebVitals';

const store = createStore(reducer);


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Main} />
                <Route path="/mae" component={Mae}/>
                <Route path="/endereco" component={Endereco} />

            </Switch>
        </BrowserRouter>
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

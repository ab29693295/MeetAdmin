import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import RouteIndex from "./route";
import {Provider} from 'react-redux'
import store from './redux/store'
function App() {
  return (
      <Provider store={store} >
      <Router>
        <div>
          <RouteIndex />
        </div>
      </Router>
      </Provider>
  );
}

export default App;

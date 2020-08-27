import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import RouteIndex from "./route";

function App() {
  return (
      <Router>
        <div>
          <RouteIndex />
        </div>
      </Router>
  );
}

export default App;

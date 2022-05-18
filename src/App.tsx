import React from 'react';
import { routes } from './router';
import './App.css';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  const Menu = (
    <ul>
      {
        routes.map((item, idx) => (
          <li key={'menu' + idx}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))
      }
    </ul>
  )
  return (
    <div className="App">
      <Router>
        <div>
          { Menu }
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import {
  RouteWithSubRoutes
} from '@/App'

interface TacosProps {
  routes: Route[]
}
export const Tacos: React.FC<TacosProps> = ({ routes }) => {
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
      </ul>

      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}

export const Bus: React.FC = () => {
  return <h3>Bus</h3>;
}
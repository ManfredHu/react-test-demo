import React, { useState } from "react";
import { routes } from "./router";
import "./App.css";
import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from './Sidebar';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(false); // 侧边栏是否显示

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // const Menu = (
  //   <ul>
  //     {
  //       routes.map((item, idx) => (
  //         <li key={'menu' + idx}>
  //           <Link to={item.path}>{item.title}</Link>
  //         </li>
  //       ))
  //     }
  //   </ul>
  // )
  return (
    <Layout>
      <Router>
        <Sidebar collapsed={collapsed} />
        <Layout className="site-layout w-screen h-screen">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
}

export default App;

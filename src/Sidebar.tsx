
import { Layout, Menu } from 'antd';
import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  routes,
} from './router'
const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { collapsed } = props
  const history = useHistory();

  const navOnClick = ({ keyPath }: { keyPath: string[] }) => {
    history.push(keyPath[0])
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo flex justify-center">
        <img className="h-8 rounded-lg" alt="" src="https://avatars.githubusercontent.com/u/9734888?v=4" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={
          routes.map(item => {
            return {
              key: item.path,
              label: item.title,
              path: item.path,
            }
          })
        }
        onClick={navOnClick}
      />
    </Sider>
  )
}

export default Sidebar
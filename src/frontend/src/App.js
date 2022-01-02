import React from "react";

import logo from './logo.svg';
import './App.css';
import { Layout, Menu, Button } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import MapOfRestaurants from './Components/MapOfRestaurants';
import UserList from './Components/UserList';
import AddRestaurant from './Components/AddRestaurant/AddRestaurant';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return <>
  <Layout style={{ height: '100vh' }}>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          nav 4
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background example" style={{ padding: 24, minHeight: 360, height: "100%"}}>
          <div>
            <MapOfRestaurants/>
          </div>
          <div>
            <AddRestaurant/>
          </div>
          <div>
            <UserList/>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>,
  </>;
}

export default App;

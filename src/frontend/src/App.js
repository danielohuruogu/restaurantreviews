import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import logo from './logo.svg';

import './App.css';
import { Layout, Menu, Button } from 'antd';
import { EnvironmentOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';


import MainPage from './Components/MainPage/MainPage';
import AboutMe from './Components/AboutMeSection/AboutMe'

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
  <div className="App">
    <Router>
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
		    <Menu theme="dark" defaultSelectedKeys={['2']}
		        style={{
					marginTop: "50%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "left",
		        }}
			  >
		        <Menu.Item
		            key="1"
		            icon={<EnvironmentOutlined />}
		        ><Link to="/">
		            Main page
		        </Link></Menu.Item>
		        <Menu.Item
		            key="2"
		            icon={<FormOutlined />}
		        ><Link to="/">
		            Leave a review
		        </Link></Menu.Item>
		        <Menu.Item key="3" icon={<UserOutlined />}
		            style={{
						marginTop: "230%",
					}}
		        ><Link to="/about-me">
	                About Me
	            </Link></Menu.Item>
		    </Menu>
	    </Sider>
	    <Layout>
	      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
	      <Content style={{ margin: '24px 16px 0' }}>
	        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: "100%"}}>
	            <div id="main">
	                <Routes>
	                    <Route
	                        path="/"
	                        element={<MainPage/>}
	                    />
	                    <Route
	                        path="/about-me"
	                        element={<AboutMe/>}
	                    />
	                </Routes>
	            </div>
	        </div>
	      </Content>
	      <Footer style={{ textAlign: 'center' }}>Ant Design ©2022 Created by Daniel Ohuruogu</Footer>
	    </Layout>
	  </Layout>
	</Router>
  </div>
  )
}

export default App;

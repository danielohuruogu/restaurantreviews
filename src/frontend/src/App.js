import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './Styles/App.css';
import { Layout, Menu } from 'antd';
import { EnvironmentOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';

import ReviewsOverview from './Pages/ReviewsOverview';
import RestaurantPage from './Pages/RestaurantPage';
import AboutMe from './Pages/AboutMe';


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
				   {/*} console.log(broken); */}
				  }}
				  onCollapse={(collapsed, type) => {
				    {/*console.log(collapsed, type); */}
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
				<Layout style={{ minHeight: "100%" }}>
					<Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
					<Content style={{ padding: "1%" }}>
						<div className="site-layout-background" style={{ minHeight: "100%", display: "grid" }}>
							<Routes>
								<Route
									path="/"
									element={<ReviewsOverview/>}
								/>
								<Route
                                    path="restaurants/:restaurantId"
                                    element={<RestaurantPage/>}
                                />
								<Route
									path="about-me"
									element={<AboutMe/>}
								/>
								<Route
									path="*"
									element={
										<h1>There's nothing here 🙁</h1>
									}
								/>
							</Routes>
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

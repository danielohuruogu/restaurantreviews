import React from "react";
import { useState, useEffect, useRef } from 'react';

import {Helmet} from "react-helmet";

import { Input, Select, Form, Row, Button, Col } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import './AddRestaurant.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const {Option} = Select;

function AddRestaurant() {

	const center = {
		lat: 51.5255,
		lng: 0.0352
	}
	const zoom = 10;

	const MapComponent = ({
			center,
			zoom
		}) => {
			const ref = useRef();

			useEffect( () => {
				new window.google.maps.Map(ref.current, {
					center,
					zoom,
				});
			});

			return <>
				<div ref={ref} id="map"/>
			</>
	};

    const render = (status) => {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };
    const api_Key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    return <>
        <h1>To see how a restaurant will be added to the database</h1>
        <div className="addRestaurantForm">
	        <div>
		        <Form layout="vertical">
		            <Row gutter={16}>
		                <Col span={12}>
		                    <Form.Item
		                        name="name"
		                        label="Name"
		                        rules={[{required: true, message: 'Please enter restaurant name'}]}
		                    >
		                        <Input placeholder="Please enter restaurant name"/>
		                    </Form.Item>
		                </Col>
		                <Col span={12}>
		                    <Form.Item
		                        name="email"
		                        label="Email"
		                        rules={[{required: true, message: 'Please enter restaurant email'}]}
		                    >
		                        <Input placeholder="Please enter restaurant email"/>
		                    </Form.Item>
		                </Col>
		            </Row>
		            <Row gutter={16}>
		                <Col span={12}>
		                    <Form.Item
		                        name="gender"
		                        label="gender"
		                        rules={[{required: true, message: 'Please select a gender'}]}
		                    >
		                        <Select placeholder="Please select a gender">
		                            <Option value="MALE">MALE</Option>
		                            <Option value="FEMALE">FEMALE</Option>
		                            <Option value="OTHER">OTHER</Option>
		                        </Select>
		                    </Form.Item>
		                </Col>
		            </Row>
		            <Row>
		                <Col span={12}>
		                    <Form.Item>
		                        <Button type="primary" htmlType="submit">
		                            Submit
		                        </Button>
		                    </Form.Item>
		                </Col>
		            </Row>
		        </Form>
		    </div>
		    <Wrapper apiKey={api_Key} render={render}>
				<MapComponent center={center} zoom={zoom}/>
		    </Wrapper>
	    </div>
    </>
}

export default AddRestaurant;
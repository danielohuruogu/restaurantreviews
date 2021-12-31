import React from "react";
import { useState, useEffect, useRef } from 'react';


import { Input, Select, Form, Row, Button, Col, Rate } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import './AddRestaurant.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const {Option} = Select;

function AddRestaurant() {

	const [addressQuery, setAddressQuery] = useState({
		query: "",
		fields: ["name", "geometry"]
	})

	const center = {
		lat: 51.5255,
		lng: 0.0352
	}
	const zoom = 10;

	const MapComponentWithSearch = ({ center,zoom,
// 	query
		}) => {
		const ref = useRef();

		useEffect(() => {
			let map = new window.google.maps.Map(ref.current, { center,zoom });

			var service = new window.google.maps.places.PlacesService(map);

			const request = {
				query: "10 Downing Street",
				fields: ["name, geometry"],
			}

            service.findPlaceFromQuery(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                    for (let i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                    map.setCenter(results[0].geometry.location);
                }
            });
//             console.log("the address query coming in from the prop is: " + query)

            let infowindow = new window.google.maps.InfoWindow();

            const createMarker = (place) => {
                if (!place.geometry || !place.geometry.location) return;

                const marker = new window.google.maps.Marker({
                    map,
                    position: place.geometry.location,
                });

                window.google.maps.event.addListener(marker, "click", () => {
                    infowindow.setContent(place.name || "");
                    infowindow.open(map);
                });
            }
		}, []);

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
    console.log(api_Key);

    const onFinish = restaurant => {
        console.log(JSON.stringify(restaurant,null,2))
    }

    return <>
        <h1>To see how a restaurant will be added to the database</h1>
        <div className="addRestaurantForm">
	        <div>
		        <Form layout="vertical"
		            onFinish={onFinish}>
		            <Row gutter={16}>
		                <Col span={12}>
		                    <Form.Item
		                        name="Place name"
		                        label="Name"
		                        rules={[{required: true, message: 'Please enter restaurant name'}]}
		                    >
		                        <Input placeholder="Please enter restaurant name"/>
		                    </Form.Item>
		                </Col>
		            </Row>
		            <Row gutter={16}>
		                <Col span={12}>
		                    <Form.Item
		                        name="Address"
		                        label="Address"
		                        rules={[{required: true}]}
		                    >
		                        <Input placeholder="Enter the address"
		                            value={addressQuery.query}
		                            onInput={e => setAddressQuery(prevState => ({
		                                addressQuery: {
		                                    ...prevState.addressQuery,
		                                    query:e.target.value
		                                }
		                            }))}/>
		                    </Form.Item>
		                </Col>
		            </Row>
		            <Row gutter={16}>
		                <Col span={12}>
		                    <Form.Item
		                        name="Type of food"
		                        label="Type of food"
		                    >
		                        <Input placeholder="What kind of food was the place"/>
		                    </Form.Item>
		                </Col>
		                <Col span={12}>
		                    <Form.Item name="Rate the food" label="Rating">
		                        <Rate/>
		                    </Form.Item>
		                </Col>
		            </Row>
		            <Row gutter={16}>
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
		    <Wrapper apiKey={api_Key} render={render} libraries={["places"]}>
				<MapComponentWithSearch center={center} zoom={zoom} query={addressQuery.query}/>
		    </Wrapper>
	    </div>
    </>
}

export default AddRestaurant;
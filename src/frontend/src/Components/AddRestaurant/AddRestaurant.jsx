import React from "react";
import { useState, useEffect, useRef } from 'react';


import { Input, Select, Form, Row, Button, Col, Rate } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import './AddRestaurant.css';
import './AddSearchBox';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const {Option} = Select;

function AddRestaurant() {

	//**************** global states **********************//
	const [addressInfo, setAddressInfo] = useState({
		formattedString: "",
		latitude: null,
		longitude: null,
	})


	//***************** FOR THE FORM SECTION ****************//

	// to send info to the backend on submission
    function onFinish(restaurant) {
        // to debug
        console.log(JSON.stringify(restaurant,null,2))
    }

	const AddressQueryForm = () => {

		return <>
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
	                        <Input
	                            placeholder="Enter the address"
	                        />
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
		</>
	}

	//***************** FOR THE MAP SECTION ****************//


	// declare variables for the map section
	var map;
	var searchBox;

	// initial centre for the map - just to start
	const center = {
		lat: 51.5255,
		lng: 0.0352
	}
	const zoom = 10;

	const api_Key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

	function render(status) {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };

	const MapComponentWithSearch = ({ center,zoom }) => {
		const refMap = useRef();
		const refSearchBox = useRef();

		useEffect(() => {
			map = new window.google.maps.Map(refMap.current, { center,zoom });
			searchBox = new window.google.maps.places.SearchBox(refSearchBox.current);

    		map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(refSearchBox.current);
            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds());
            });

			let markers = [];

            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();
                if (places.length == 0) {
                    return;
                }

                markers.forEach((marker)=>{
                    marker.setMap(null);
                });
                markers = [];

                const bounds = new window.google.maps.LatLngBounds();
                places.forEach((place)=>{
                    if (!place.geometry || !place.geometry.location) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

					const icon = {
	                    url: place.icon,
	                    size: new window.google.maps.Size(71, 71),
	                    origin: new window.google.maps.Point(0, 0),
	                    anchor: new window.google.maps.Point(17, 34),
	                    scaledSize: new window.google.maps.Size(25, 25),
	                  };

                    const marker = new window.google.maps.Marker({
                        map,
                        position: place.geometry.location,
    					icon,
                        title: place.name
                    });

                    console.log(place)
                    console.log(place.geometry)

                    let addressDescription =
                         '<div style="align-content: center; align-items: center; text-align: center;" id="content">' +
                         '<h5 class="formattedAddress">' + place.formatted_address + '</h5>' +
                         '<div id="bodyContent">' +
                         "<button style='font-size: 0.8em; margin-bottom: 5px;' class='btn btn-primary' type='button' onclick='populateAddressFields()'>Pick address</button>" +
                         "</div>" + "</div>";

                    const infowindow = new window.google.maps.InfoWindow({
                        content: addressDescription,
                    });

                    (function (m, infowindow) {
                        window.google.maps.event.addListener(m, 'click', function (event) {
                            infowindow.setContent(addressDescription);
                            infowindow.open(map, m);
                        })
                    })(marker, infowindow);

                    markers.push(marker);

                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            })
		}, [refMap.current, refSearchBox.current]);

		function populateAddressFields() {
			console.log("Hi");
		}

		return <>
			<div ref={refMap} id="map">
				<input ref={refSearchBox} id="pac-input" placeholder={"Where are you looking for?"}/>
			</div>
		</>
	};

    return <>
        <h1>To see how a restaurant will be added to the database</h1>
        <div className="addRestaurantSection">
	        <AddressQueryForm/>
		    <Wrapper apiKey={api_Key} render={render} libraries={["places"]}>
				<MapComponentWithSearch center={center} zoom={zoom}/>
{/* 				<SearchBox maps={map} placeholder={"What are you looking for?"}/> */}
		    </Wrapper>
	    </div>
    </>
}

export default AddRestaurant;
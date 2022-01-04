import React from 'react';
import { useRef, useEffect, forwardRef } from 'react';
import { Input, Select, Form, Row, Button, Col, Rate } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FormSection = ({ addressInfo }) => {
	const refForm = useRef()
	const refForRating = useRef();

	useEffect(()=>{
		if (addressInfo) {
			refForm.current.setFieldsValue({
				Address: addressInfo.formatted_address
			})
		}
	})

	function onFinish(restaurant) {
        // to debug
        console.log(JSON.stringify(restaurant,null,2));
    }

	function onFinishFailed(errorInfo) {
		console.log(JSON.stringify(errorInfo, null, 2));
	};

	return (
		<>
			<Form layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                ref={refForm}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="Place name"
                            label="Name"
                            rules={[{
//                             required: true,
                            message: 'Please enter restaurant name'}]}
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
//                             rules={[{required: true}]}
                        >
                            <Input placeholder="Where are you looking for?" type="text"/>
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
                        <Form.Item name="Rate the food" label="Rating" ref={refForRating}>
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
	)
}

export default FormSection;
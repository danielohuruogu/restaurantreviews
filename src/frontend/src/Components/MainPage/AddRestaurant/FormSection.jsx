import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { Input, Select, Form, Row, Popconfirm, Button, Col, Rate } from 'antd';

import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FormSection = ({ addressInfo, handleVisibility }) => {
	const refForm = useRef()
	const refForRating = useRef();

	const [confirmVisible, setConfirmVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	useEffect(()=>{
		if (addressInfo) {
			refForm.current.setFieldsValue({
				Address: addressInfo.formatted_address
			})
		}
	})

	const [form] = Form.useForm();

	function onSubmitConfirm(reviewInfo) {
        // to debug
        console.log(JSON.stringify(reviewInfo,null,2));
        handleVisibility()
    }

	function onSubmitConfirmFailed(errorInfo) {
		console.log(JSON.stringify(errorInfo, null, 2));
	};

	function showPopConfirm() {
		setConfirmVisible(!confirmVisible);
	};

	function handleOk() {
		form
			.validateFields()
			.then(info => {
				form.resetFields();
				onSubmitConfirm(info)
			})
		setConfirmVisible(!confirmVisible);
	}

	function handleCancel() {
		setConfirmVisible(!confirmVisible);
	}

	return (
		<>
			<Form
				form={form}
				layout="vertical"
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
                    <Col span={22}>
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
                        <Form.Item name="Rating" label="Rate the place" ref={refForRating}>
                            <Rate/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={22}>
	                    <Form.Item name="Review" label="Leave a review of your visit:" placeholder="What did you think?">
	                        <Input.TextArea
	                            autoSize={{ minRows: 4, maxRows: 8 }}
	                            allowClear="true"
	                        />
	                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item>
                            <Popconfirm
//                                 okButtonProps={{ loading: confirmLoading }}
                                onCancel={handleCancel}
                                onConfirm={handleOk}
                                title="Are you sure?"
                                visible={confirmVisible}
                            >
                                <Button type="primary" onClick={showPopConfirm}>
                                    Submit
                                </Button>
                            </Popconfirm>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
		</>
	)
}

export default FormSection;
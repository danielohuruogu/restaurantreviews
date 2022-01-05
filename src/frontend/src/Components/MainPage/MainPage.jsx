import React, { useState, useRef, StrictMode, createRef } from 'react';

import { Modal, Button } from 'antd';

import ReviewsOverview from './ReviewOverview/ReviewsOverview';
import UserList from './UserList';
import AddRestaurant from './AddRestaurant/AddRestaurant';

function MainPage() {
	const DivForModal = React.forwardRef((ref) =>
	<div ref={ref}>
	</div>
	);

	const modalRef = createRef();

	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setVisible(true);
	}

	const handleVisibility = () => {
		setVisible(!visible);
	}

	return <div className="example">
		<div>
			<ReviewsOverview/>
		</div>
		<Button type="primary" onClick={showModal}>
			Click here to add a review
		</Button>
		<DivForModal ref={modalRef}>
			<Modal
				footer={null}
				okText={"Submit"}
				style={{
					left: 80
				}}
				visible={visible}
				width={"80vw"}
			>
				<AddRestaurant handleVisibility={handleVisibility}/>
			</Modal>
		</DivForModal>
	</div>
}

export default MainPage;
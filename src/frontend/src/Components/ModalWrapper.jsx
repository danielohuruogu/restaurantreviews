import React, { useState } from 'react'

import Modal from 'react-modal';

export function ModalWrapper(props) {

	const { RenderComponent, ...other } = props

	const [isOpen, setOpen] = useState(false);

	const showModal = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

	return (
		<Modal
			onRequestClose={handleClose}
			isOpen={isOpen}
			aria={{
				labelledby: "modal title",
				describedby: "modal description"
			}}
			parentSelector={()=>document.querySelector('#root')}
			{...other}
			>
			<RenderComponent />
		</Modal>

	)
}
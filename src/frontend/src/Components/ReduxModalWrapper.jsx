import React from 'react'

import Modal from 'react-modal';

import '../Styles/ModalWrapper.css'

export default function ReduxModalWrapper(props) {

	const { RenderComponent, reduxSelection, reduxClearSelection, displayData, ...other } = props

	return (
		<>
			<Modal
				onRequestClose={reduxClearSelection}
				isOpen={reduxSelection}
				aria={{
					labelledby: "modal title",
					describedby: "modal description"
				}}
				parentSelector={()=>document.querySelector('#root')}
				overlayClassName={'searchModalOverlay'}
                className={'searchModalContainer'}
                ariaHideApp={false}
				>
				<RenderComponent
					payload={displayData}
					{...other}
					/>
			</Modal>
		</>
	)
}
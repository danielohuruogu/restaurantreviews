import React, { useState } from 'react'

import Modal from 'react-modal';
import Controls from './Reusables/Controls.jsx';

import '../Styles/ModalWrapper.css'

export default function ModalWrapper(props) {

	const { RenderComponent, modalStyleClassName=null, modalOverlayStyleClassName=null, incButton=null, btnText=null, redux=null,displayData=null, ...other } = props

	const [isOpen, setOpen] = useState(false);

	const showModal = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

	return (
		<>
			{(incButton && btnText) && (
                <Controls.MButton className="buttonWidth" onClick={showModal} text={btnText}/>
            )}
			<Modal
				onRequestClose={handleClose}
				isOpen={isOpen}
				aria={{
					labelledby: "modal title",
					describedby: "modal description"
				}}
				parentSelector={ ()=>document.querySelector('#root') }
				overlayClassName={ modalOverlayStyleClassName ? modalOverlayStyleClassName : 'modalOverlay' }
                className={ modalStyleClassName ? modalStyleClassName : 'modalContainer' }
                ariaHideApp={false}
				>
				<RenderComponent
					{...(displayData && {
						displayData:true, payload:displayData
					})}
					{...other}
					/>
			</Modal>
		</>
	)
}
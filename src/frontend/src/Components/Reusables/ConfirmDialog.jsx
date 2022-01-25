import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Close from '@mui/icons-material/Close';

import Controls from './Controls.jsx';

import create from 'zustand';


const useConfirmDialogStore = create((set) => ({
	message: "",
	onSubmit: undefined,
	close: () => set({ onSubmit: undefined }),
}));

export const confirmDialog = (message, onSubmit) => {
	useConfirmDialogStore.setState({
		message,
		onSubmit,
	});
};

function ConfirmDialog() {

	const { message, onSubmit, close } = useConfirmDialogStore();

	return (
		<Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm">
			<Box position="absolute" top={0} right={0}>
	            <IconButton onClick={close}>
	              <Close />
	            </IconButton>
	        </Box>
	        <DialogContent>
	            <Typography>{message}</Typography>
	        </DialogContent>
	        <DialogActions>
	            <Controls.MButton color="" onClick={close} text="Cancel"/>
	            <Controls.MButton
	                onClick={() => {
						if (onSubmit) {
							onSubmit();
						}
						close();
					}}
					color="primary" text="Confirm"/>
	        </DialogActions>
		</Dialog>
	)
}

export default ConfirmDialog;
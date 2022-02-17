import React from 'react';

import { useForm, Form } from './useForm.jsx';

import Controls from './Reusables/Controls.jsx';
import { confirmDialog } from './Reusables/ConfirmDialog';

import { updateShopDetails, deleteShop } from '../Adapters/client.js';

import { useNavigate } from 'react-router-dom';

import '../Styles/UpdateShopForm.css';


export default function UpdateShopForm(props) {

	const { restaurantId } = props;

	const initialFValues = {
		shop_name: "",
		street: "",
		city: "",
		post_code: "",
		type_of_food: [],
		website: ""
	}

	const {
        values,
        setValues,
        errors,
        setErrors,
        resetForm,
        handleInputChange,
    } = useForm(initialFValues)

    const submitForm = () => {
        console.log("submitted form")
        console.log(JSON.stringify(values,null,2));
        updateShopDetails(restaurantId, values)
		resetForm();
    }

	const navigate = useNavigate();


	return (
		<Form className="formContainer">
			<Controls.Input label="Name changed?"/>
			<label>Address changed?</label>
			<Controls.Input label="Street"/>
			<Controls.Input label="City"/>
			<Controls.Input label="Post code"/>
			<div>
				<label>Type of food sold changed?</label>
				<Controls.TagsInput name="type_of_food" stateItems={values} setStateItems={setValues}/>
			</div>
			<Controls.Input label="Website changed?"/>
			<div className="btnContainer">
				<div>
					<Controls.MButton color="info" onClick={resetForm} text="Reset"/>
	                <Controls.MButton
	                    onClick={() => {
	                        confirmDialog("Confirm update?", () => {
	                            console.log("submitting form");
	                            submitForm();
	                        })
	                    }}
	                    text="Update"
	                    />
                </div>
                <div>
	                <Controls.MButton
	                    color="warning"
	                    onClick={() => {
	                        confirmDialog("Delete shop from records?", () => {
	                            console.log("deleted shop. will replace with proper function");
	                            console.log(JSON.stringify(values,null,2));
	                            deleteShop(values)
	                           {/* navigate(`/`); */}
	                        })
	                    }}
	                    text="Delete shop"
	                    />
                </div>
            </div>
		</Form>
	)
}
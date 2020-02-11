import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export const FormContext = createContext(undefined)

export default function Form(props) {
	const [form, setForm] = useState({
		title: "",
		description: "",
		questions: {
			0: {
				id: 0,
				title: '',
				options: {
					0: {
						id: 0,
						title: 'Option 0'
					}
				},
				other: false,
				required: false,
				type: 'multiple'
			}
		}
	});

	function changeTitle() {
		let newForm = form;
		newForm.title = title;
		setForm(newForm);
	}

	function changeDescription() {
		let newForm = form;
		newForm.description = description;
		setForm(newForm);
	}

	function updateQuestion() {
		let newForm = form;

		if (id !== undefined) {
			newForm.questions[id] = question
			setForm(newForm);
		}

	}

	function deleteQuestion() {
		let newForm = form;

		delete newForm.questions[id];

		setForm(newForm);
	}

	return (
		<FormContext.Provider value={{
			data: form,
			changeTitle,
			changeDescription,
			updateQuestion,
			deleteQuestion
		}}>
			{props.children}
		</FormContext.Provider>
	)
}
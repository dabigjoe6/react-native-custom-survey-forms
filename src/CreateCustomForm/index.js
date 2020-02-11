import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FormContext } from '../contexts/Form';

import { Question } from './components';

export default function CreateCustomForm(props) {

	const [changed, setChanged] = useState(false);

	const [formTitle, setFormTitle] = useState('');
	const [formDescription, setFormDescription] = useState('');

	const [questions, setQuestions] = useState([
		{
			id: 0,
			title: '',
		}
	])

	let form = useContext(FormContext).data;

	let changeFormTitle = useContext(FormContext).changeTitle;

	let changeFormDescription = useContext(FormContext).changeDescription;

	let addNewQuestion = useContext(FormContext).updateQuestion;

	let deleteQuestion = useContext(FormContext).deleteQuestion;

	useEffect(() => {
		changeFormTitle(formTitle);
	}, [formTitle])

	useEffect(() => {
		changeFormDescription(formDescription);
	}, [formDescription])

	function updateQuestion() {

		setChanged(!changed);
		let newQuestions = questions;

		let questionID = questions.length;

		let newQuestionObject = {
			id: questionID,
			title: '',
			options: {
				0: {
					id: 0,
					title: 'Option 0'
				}
			}
		}

		newQuestions.push(newQuestionObject)

		addNewQuestion(newQuestionObject, questionID)

		setQuestions(newQuestions)

	}

	function removeQuestion(id) {
		setChanged(!changed);

		deleteQuestion(id);

		let newQuestions = questions;

		newQuestions = newQuestions.filter((item) => {
			return item.id != id;
		})

		setQuestions(newQuestions);
	}


	function createForm() {
		//Do something

	}

	function renderQuestions({ item }) {
		return <Question key={item.id} data={item} removeQuestion={removeQuestion} />
	}

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				<View style={styles.detailsInputWrapper}>
					<TextInput
						placeholder="Form title"
						defaultValue="Untitled form"
						onChangeText={(input) => { setFormTitle(input) }}
						value={formTitle}
					/>
					<TextInput
						placeholder="Form description"
						onChangeText={(input) => { setFormDescription(input) }}
						value={formDescription}
					/>
				</View>
				<View style={{ width: '100%' }}>
					<FlatList
						data={questions}
						renderItem={renderQuestions}
						keyExtractor={(item, index) => index}
						extraData={changed}
					/>
				</View>
				<View style={styles.addQuestionBtn}>
					<TouchableOpacity onPress={updateQuestion}>
						<Text>Add question</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<View style={styles.submitFormBtn}>
				<TouchableOpacity onPress={() => {
					props.onSubmitForm(form)
				}}>
					<Text>Submit Form</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: 'center'
	},
	scrollView: {
		width: '100%',
		paddingTop: 10,
		marginBottom: 70,
	},
	detailsInputWrapper: {
		width: '100%',
		padding: 20
	},
	addQuestionBtn: {
		alignSelf: 'flex-end',
		width: '40%',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 4,
		alignItems: 'center',
		paddingVertical: 10,
		marginRight: 20,
		marginBottom: 30
	},
	submitFormBtn: {
		alignSelf: 'center',
		width: '60%',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 4,
		alignItems: 'center',
		paddingVertical: 10,
		marginBottom: 20,
		position: 'absolute',
		bottom: 10
	}
})
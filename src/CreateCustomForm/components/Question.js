import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Picker, TouchableNativeFeedback, StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FormContext } from '../../contexts/Form';

import OptionList from './OptionList';

export default function Question(props) {


	//@ts-ignore
	const updateQuestion = useContext(FormContext).updateQuestion;

	//@ts-ignore
	let form = useContext(FormContext).data;

	const [questionTitle, setQuestionTitle] = useState('')
	const [questionType, setQuestionType] = useState('multiple');
	const [isRequired, setIsRequired] = useState(false);

	useEffect(() => {
		let newQuestion = form.questions[props.data.id];
		newQuestion.title = questionTitle;

		updateQuestion(newQuestion, newQuestion.id);

	}, [questionTitle])

	useEffect(() => {
		let newQuestion = form.questions[props.data.id]
		newQuestion.type = questionType;

		updateQuestion(newQuestion, newQuestion.id)

	}, [questionType])

	useEffect(() => {
		let newQuestion = form.questions[props.data.id];

		newQuestion.required = isRequired;

		updateQuestion(newQuestion, newQuestion.id);
	}, [isRequired])

	function renderShortAnswer() {
		return (
			<View style={[styles.disabledTextInput, { width: '40%' }]}>
				<Text style={{ color: 'grey' }}>Short-answer text</Text>
			</View>
		)
	}

	function renderLongAnswer() {
		return (
			<View style={[styles.disabledTextInput, { width: '80%' }]}>
				<Text style={{ color: 'grey' }}>Long-answer text</Text>
			</View>
		)
	}

	function render() {

		switch (questionType) {
			case 'short_answer':
				return renderShortAnswer();
				break;
			case 'paragraph':
				return renderLongAnswer();
				break;
			case 'multiple':
				return <OptionList questionID={props.data.id} type="multiple" />
				break;
			case 'checkbox':
				return <OptionList questionID={props.data.id} type="checkbox" />
				break;
			case 'drop_down':
				return <OptionList questionID={props.data.id} type="drop_down" />
				break;
			default:
				return <OptionList questionID={props.data.id} type="multiple" />
				break;
		}
	}

	let requiredIcon = isRequired ? 'toggle-switch' : 'toggle-switch-off-outline';

	return (

		<View style={{ padding: 20 }}>
			<TextInput
				selectTextOnFocus
				placeholder="Question title"
				onChangeText={(input) => { setQuestionTitle(input) }}
				value={questionTitle}
			/>
			<View style={styles.pickerWrapper}>
				<Picker
					selectedValue={questionType}
					style={styles.picker}
					onValueChange={(itemValue, itemIndex) =>
						setQuestionType(itemValue)
					}>
					<Picker.Item label="Multiple choice" value="multiple" />
					<Picker.Item label="Checkboxes" value="checkbox" />
					<Picker.Item label="Drop-down" value="drop_down" />
					<Picker.Item label="Short answer" value="short_answer" />
					<Picker.Item label="Paragraph" value="paragraph" />
				</Picker>

			</View>

			<View>
				{render()}
				<View style={styles.questionFooter}>
					<View style={{ marginHorizontal: 20 }}>
						<TouchableNativeFeedback onPress={() => {
							props.removeQuestion(props.data.id)
						}}>
							<IonIcon name="ios-trash" style={{ fontSize: 20 }} />
						</TouchableNativeFeedback>
					</View>
					<TouchableNativeFeedback onPress={() => { setIsRequired(!isRequired) }}>
						<View style={styles.requiredBtn}>
							<Text>Required</Text>
							<MaterialCommunityIcon style={{ fontSize: 30, marginLeft: 5 }} name={requiredIcon} />
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	disabledTextInput: {
		borderBottomColor: '#00000020',
		paddingBottom: 10,
		borderStyle: 'solid',
		borderBottomWidth: 1,
	},
	pickerWrapper: {
		borderColor: '#00000040',
		borderWidth: 1,
		borderRadius: 10,
		borderStyle: 'solid',
		marginBottom: 20,
		width: '60%'
	},
	picker: {
		height: 50,
		width: '100%',
	},
	questionFooter: {
		marginTop: 40,
		borderStyle: "solid",
		borderTopWidth: 1,
		borderTopColor: '#00000020',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: 10
	},
	requiredBtn: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})
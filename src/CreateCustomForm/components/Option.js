import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FormContext } from '../../contexts/Form';

export default function Option(props) {

	const [change, setChange] = useState(false);

	const [optionTitle, setOptionTitle] = useState('');

	const [isRemoveOptionBtnVisible, setIsRemoveOptionBtnVisible] = useState(true);

	const updateQuestion = useContext(FormContext).updateQuestion;

	const form = useContext(FormContext).data;

	useEffect(() => {
		setOptionTitle(props.data.title)
	}, []);

	function updateFormQuestion() {

		if (form.questions.hasOwnProperty(props.questionID)) {
			let newQuestion = form.questions[props.questionID];

			if (Object.values(newQuestion.options).length >= 2) {
				setIsRemoveOptionBtnVisible(true);
			} else {
				setIsRemoveOptionBtnVisible(false);
			}


			if (typeof newQuestion.options[props.data.id].title !== "undefined") {

				newQuestion.options[props.data.id].title = optionTitle;
				updateQuestion(newQuestion);
			}
		}
	}

	useEffect(() => {
		updateFormQuestion();
	}, [optionTitle])


	useEffect(() => {
		updateFormQuestion();
	}, [change])

	function removeOption() {
		setChange(!change);
		props.removeOption(props.data.id);
	}

	function renderIcon() {
		switch (props.type) {
			case 'multiple':
				return <IonIcon name="ios-radio-button-off" />
				break;
			case 'checkbox':
				return <MaterialCommunityIcon name="checkbox-blank-outline" />
				break;
			case 'drop_down':
				return <Text>{`${props.index}.`}</Text>
				break;
			default:
				return <IonIcon name="ios-radio-button-off" />
				break;
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.input}>
				{renderIcon()}
				<TextInput
					selectTextOnFocus
					onChangeText={(input) => { setOptionTitle(input) }}
					value={optionTitle}
					style={{ marginLeft: 20 }}
				/>
			</View>

			{isRemoveOptionBtnVisible &&
				<TouchableWithoutFeedback onPress={removeOption}>
					<IonIcon name="ios-close" style={{ fontSize: 20 }} />
				</TouchableWithoutFeedback>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	input: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})
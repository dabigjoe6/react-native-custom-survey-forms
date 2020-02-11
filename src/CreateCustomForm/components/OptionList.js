import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Option from './Option';
import { FormContext } from '../../contexts/Form';

export default function OptionList(props) {

	const [change, setChange] = useState(false);

	const updateQuestion = useContext(FormContext).updateQuestion;

	const form = useContext(FormContext).data;

	const [options, setOptions] = useState([
		{
			id: 0,
			title: `Option ${0}`
		}
	])

	const [optionsLength, setOptionsLength] = useState(1);

	const [isOther, setIsOther] = useState(false);

	useEffect(() => {
		let newQuestion = form.questions[props.questionID];

		newQuestion.other = isOther;

		updateQuestion(newQuestion, props.questionID);

	}, [isOther])

	function addOption() {

		setChange(!change);

		let optionID = options.length;

		let newOptionObject = {
			id: optionID,
			title: `Option ${optionID}`
		}

		let newOptions = options;
		newOptions.push(newOptionObject)

		let newQuestion = form.questions[props.questionID];

		newQuestion.options[optionID] = newOptionObject;

		updateQuestion(newQuestion, props.questionID);

		setOptions(newOptions);
		setOptionsLength(newOptions.length)

	}

	function removeOption(id) {

		setChange(!change);

		let newOptions = options;
		newOptions = newOptions.filter((item) => {
			return id != item.id
		})

		let newQuestion = form.questions[props.questionID];

		delete newQuestion.options[id];

		updateQuestion(newQuestion, props.questionID);

		setOptions(newOptions);
		setOptionsLength(newOptions.length);

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
				return <Text>{`${optionsLength}.`}</Text>
				break;
			default:
				return <IonIcon name="ios-radio-button-off" />
				break;
		}
	}

	function renderOther() {
		if (props.type !== 'drop_down' && isOther) {
			return (
				<View style={styles.otherContainer}>
					{renderIcon()}
					<View style={styles.disabledOtherTextInput}>
						<Text style={{ color: "#00000050" }}>  Other....</Text>
					</View>
					<TouchableWithoutFeedback onPress={() => { setIsOther(false) }}>
						<IonIcon name="ios-close" style={{ fontSize: 20 }} />
					</TouchableWithoutFeedback>
				</View>
			)
		} else {
			return null;
		}
	}

	function renderItem({ item, index }) {
		return (
			<Option
				key={item.id}
				type={props.type}
				data={item}
				questionID={props.questionID}
				index={index}
				removeOption={removeOption} />
		)
	}


	return (
		<View style={{ marginTop: 20, paddingLeft: 20 }}>
			<FlatList
				data={options}
				renderItem={renderItem}
				extraData={change}
				keyExtractor={(item, index) => index}
			/>
			{renderOther()}
			<View style={{ flexDirection: 'row', marginTop: 20 }}>
				{renderIcon()}
				<View style={{ flexDirection: 'row', marginLeft: 20 }}>
					<TouchableWithoutFeedback onPress={addOption}>
						<View style={styles.addOption}>
							<Text>Add option</Text>
						</View>
					</TouchableWithoutFeedback>
					{props.type !== 'drop_down' && <Text> or </Text>}
					{
						props.type !== 'drop_down' && <TouchableWithoutFeedback onPress={() => setIsOther(true)}>
							<Text style={{ color: 'blue' }}>Add "Other" </Text>
						</TouchableWithoutFeedback>
					}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	otherContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		marginBottom: 20
	},
	disabledOtherTextInput: {
		borderStyle: "solid",
		borderBottomWidth: 1,
		borderBottomColor: "#00000020",
		width: '80%'
	},
	addOption: {
		borderBottomWidth: 1,
		borderBottomColor: '#00000040',
		borderStyle: 'solid'
	}
})
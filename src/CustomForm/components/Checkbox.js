import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, StyleSheet } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Checkbox(props) {

	const [options, setOptions] = useState([])
	const [changed, setChanged] = useState(false);

	useEffect(() => {

		let newOptions = Object.values(props.question.options).map((option) => {
			let optionObject = {
				id: option.id,
				title: option.title,
				selected: false
			}

			return optionObject;
		})

		setOptions(newOptions);
	}, [])

	function handleSelectedOption(id) {

		setChanged(!changed);

		let newOptions = options;

		newOptions.forEach((item) => {
			if (item.id == id) {
				item.selected = !item.selected;
			}
		})

		setOptions(newOptions);

	}

	useEffect(() => {
	}, [options])

	function renderItem({ item }) {
		let iconName = item.selected ? 'checkbox-marked-outline' : 'checkbox-blank-outline';
		return (
			<TouchableWithoutFeedback onPress={() => handleSelectedOption(item.id)}>
				<View style={{ flexDirection: 'row', marginVertical: 5 }}>
					<MaterialCommunityIcon name={iconName} />
					<Text style={{ marginLeft: 10 }}>{item.title}</Text>
				</View>
			</TouchableWithoutFeedback>
		)
	}

	return (
		<View style={{ marginVertical: 10 }}>
			<View style={{ flexDirection: 'row' }}>
				<Text>{props.question.title}</Text>
				{
					props.question.required &&
					<Text style={{ color: 'red' }}> * </Text>
				}
			</View>
			<View style={styles.optionsWrapper}>
				<FlatList
					data={options}
					renderItem={renderItem}
					extraData={changed}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		</View>

	)
}

const styles = StyleSheet.create({
	optionsWrapper: {
		paddingHorizontal: 10,
		marginTop: 10
	}
})

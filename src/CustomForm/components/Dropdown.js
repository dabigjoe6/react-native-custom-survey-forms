import React, { useEffect, useState } from 'react';
import { View, Text, Picker, PickerItem, StyleSheet } from 'react-native';

export default function Dropdown(props) {

	const [options, setOptions] = useState([]);

	useEffect(() => {

		let newOptions = Object.values(props.question.options).map((option) => {
			let optionObject = {
				id: option.id,
				title: option.title,
				selected: false
			}

			return optionObject;
		});

		setOptions(newOptions);
	}, [])

	function handleSelectedOption(itemValue) {
		let newOptions = options;

		newOptions.forEach((item) => {
			if (item.id !== itemValue) {
				item.selected = false;
			} else {
				item.selected = true;
			}
		});

		setOptions(newOptions);
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
			<View style={styles.pickerWrapper}>
				<Picker
					style={styles.picker}
					onValueChange={(itemValue, itemIndex) => {
						handleSelectedOption(itemValue);
					}}>
					{
						options.map((option) => {
							return <Picker.Item key={option.id} label={option.title} value={option.id} />
						})
					}
				</Picker>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	pickerWrapper: {
		borderWidth: 1,
		borderColor: "#00000030",
		width: '70%',
		alignSelf: 'center',
		borderRadius: 6,
		marginTop: 10
	},
	picker: {
		height: 30,
		width: '100%'
	}
})
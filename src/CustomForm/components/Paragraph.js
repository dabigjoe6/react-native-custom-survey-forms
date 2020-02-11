import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Paragraph(props) {

	const [answer, setAnswer] = useState('');

	return (
		<View style={{ marginVertical: 10 }}>
			<View style={{ flexDirection: 'row' }}>
				<Text>{props.question.title}</Text>
				{
					props.question.required &&
					<Text style={{ color: 'red' }}>*</Text>
				}
			</View>
			<TextInput
				placeholder="Your answer"
				onChangeText={(input) => setAnswer(input)}
				multiline={true}
				numberOfLines={4}
				textAlignVertical="top"
				style={styles.textInput}
				value={answer}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1,
		borderColor: '#00000030',
		borderRadius: 10,
		marginTop: 10,
		padding: 5
	}
})
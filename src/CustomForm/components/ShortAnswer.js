import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function ShortAnswer(props) {

	const [answer, setAnswer] = useState('');

	return (
		<View style={{ marginVertical: 10 }}>
			<View style={{ flexDirection: 'row' }}>
				<Text>{props.question.title}</Text>
				{
					props.question.required &&
					<Text style={{ color: 'red' }}> * </Text>
				}
			</View>
			<TextInput
				placeholder="Your answer"
				onChangeText={(input) => setAnswer(input)}
				value={answer}
			/>
		</View>
	)
}
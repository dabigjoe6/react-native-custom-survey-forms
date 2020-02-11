import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import test_form from '../TestForm';
import { ShortAnswer, Paragraph, Multiple, Checkbox, Dropdown } from './components';

export default function CustomForm(props) {

	let questions = Object.values(props.form.questions);

	function renderQuestion({ item }) {

		console.log("ITEM HERE", item);
		switch (item.type) {
			case 'short_answer':
				return <ShortAnswer question={item} />
				break;
			case 'paragraph':
				return <Paragraph question={item} />;
				break;
			case 'multiple':
				return <Multiple question={item} />;
				break;
			case 'checkbox':
				return <Checkbox question={item} />;
				break;
			case 'drop_down':
				return <Dropdown question={item} />;
				break;
			default:
				return null;
				break;
		}
	}

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>{test_form.title}</Text>
			<Text>{test_form.description}</Text>
			<View style={styles.questionsWrapper}>
				<FlatList
					data={questions}
					renderItem={renderQuestion}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
	},
	title: {
		fontSize: 30,
		marginBottom: 10
	},
	questionsWrapper: {
		marginVertical: 30
	}
})
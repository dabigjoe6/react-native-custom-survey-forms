const test_form = {
	title: "Basic questions",
	description: "Questions to test this form",
	questions: {
		0: {
			id: 0,
			title: 'What is your name?',
			options: {
				0: {
					id: 0,
					title: 'Option 0'
				}
			},
			other: false,
			required: true,
			type: 'short_answer'
		},
		1: {
			id: 1,
			title: "Short description of your laptop",
			options: {
				0: {
					id: 0,
					title: 'Option 0'
				}
			},
			other: false,
			required: false,
			type: 'paragraph'
		},
		2: {
			id: 2,
			title: 'Have you coded for more than 9 hours at a go before?',
			options: {
				0: {
					id: 0,
					title: 'Yes'
				},
				1: {
					id: 1,
					title: 'No'
				},
				2: {
					id: 2,
					title: 'Maybe'
				}
			},
			other: false,
			required: true,
			type: 'multiple'
		},
		3: {
			id: 3,
			title: 'What are the factors you consider in buying a laptop?',
			options: {
				0: {
					id: 0,
					title: 'Portability',
				},
				1: {
					id: 1,
					title: 'Battery life',
				},
				2: {
					id: 2,
					title: 'Brand'
				},
				3: {
					id: 3,
					title: 'Display',
				},
				4: {
					id: 4,
					title: 'Graphics power'
				},
				5: {
					id: 5,
					title: 'Proccessor speed'
				},
				6: {
					id: 6,
					title: 'Memory size'
				},
				7: {
					id: 7,
					title: 'Durability'
				}
			},
			other: true,
			required: true,
			type: 'checkbox'
		},
		4: {
			id: 4,
			title: 'What is your gender?',
			options: {
				0: {
					id: 0,
					title: 'Male'
				},
				1: {
					id: 1,
					title: 'Female'
				},
				2: {
					id: 2,
					title: 'Confused'
				}
			},
			other: false,
			required: true,
			type: 'drop_down'
		}
	}
}

export default test_form;
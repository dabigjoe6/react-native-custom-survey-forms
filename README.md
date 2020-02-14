# react-native-custom-survey-forms
Create customized survey forms

#React Native Custom Survey Forms
---
Create custom forms and without taking users out of your application. 
![Custom Survey Form](GIF-200214_015817.gif)

## Installation

`$ npm install react-native-custom-survey-forms --save`

You also need to install [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons). Please check out [Installation section](https://github.com/oblador/react-native-vector-icons#installation) on that project.

## How to use

### Creating Custom Forms

```js
import React from 'react';
import { CreateCustomForm } from 'react-native-custom-survey-forms';

const App = () => {
	return (
			<CreateCustomForm onSubmitForm={(form) => {
        // Do something with form data
      }} />
	);
};

export default App;
```

### Getting user input from custom form

```js
import React from 'react';
import { CustomForm } from 'react-native-custom-survey-forms';

const testForm = {
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
	}
}

const App = () => {
	return (
			<CustomForm form={testForm} />
	);
};

export default App;
```

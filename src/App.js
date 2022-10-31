import React, { useState } from 'react';
import Values from 'values.js';
import SingleColor from './SingleColor';

function App() {
	const [inputColor, setInputColor] = useState('');
	const [error, setError] = useState(false);
	const [list, setList] = useState([]);

	const inputColorHandler = e => {
		setInputColor(e.target.value);
	};

	const submitHandler = e => {
		setError(false);
		e.preventDefault();
		try {
			let colors = new Values(inputColor).all(5);
			setList(colors);
		} catch (error) {
			setError(true);
			console.log(error.message);
		}
		setInputColor('');
	};

	return (
		<>
			<section className='container'>
				<h3>Color Generator</h3>
				<form onSubmit={submitHandler}>
					<input
						value={inputColor}
						type='text'
						placeholder='type color'
						onChange={inputColorHandler}
						className={`${error ? 'error' : 'null'}`}
					/>
					<button className='btn' type='submit'>
						Get Colors
					</button>
				</form>
			</section>
			<section className='colors'>
				{list.map((color, index) => (
					<SingleColor key={index} {...color} index={index} hexColor={color.hex} />
				))}
			</section>
		</>
	);
}

export default App;

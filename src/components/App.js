//import logo from './logo.svg';
import React from "react";
import './App.css';
import Multiple from './Multiple';


export default class App extends React.Component {
	render() {
		return (
			<div>
				<h4 className="text-white">Circuit Calculator</h4>
				<p className="text-white">You can add another set of resistances with the add connection button. You can drag and drop your resistances from one connection to other and basically to any input box. Don't be scared if a "NaN" appears, it just means the answer is Not a Number and that you're going to die. Rest is self explanatory. You're welcome..</p>
				< Multiple />
			</div>
		)
	}
}

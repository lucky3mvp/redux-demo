import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import App from './app'
import reducer from './reducer'

let initialState = [{
	text:"学习react",
	id:0,
	done:true
}, {
	text:"写一个demo",
	id:1,
	done:false
}];

let store = createStore( reducer, initialState ); 

const listener = () => render(
	<App store={store} />,
	document.getElementById('main')
)

listener(); 

store.subscribe(listener);

import './main.less'
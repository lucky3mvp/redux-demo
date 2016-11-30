import React from 'react'
import { render } from 'react-dom'
import { createAddAction, createDelAction, createUpdateAction } from './action'

export default React.createClass({
	PropTypes: {
		store: React.PropTypes.isRequired
	},
	addTodo (e){
		let { store } = this.props;
		let id = store.getState().length;
		let text = this.refs.addTodoIpt.value;

		if(text == '') return;
		
		store.dispatch( createAddAction( {text: text, id: id, done:false} ) );

		this.refs.addTodoIpt.value = "";
	},
	delTodo (e){
		let { store } = this.props;
		let id = e.target.id;

		store.dispatch( createDelAction( {id: id} ) );
	},
	updateTodo (e) {
		let { store } = this.props;
		let id = e.target.value;
		store.dispatch( createUpdateAction( {id: id, done:e.target.checked} ) );
	},
	render () {
		let { store } = this.props;
		let todoList = store.getState();
		return (
			<div className="todo">
				<h1 className="heading"> Todos </h1>
				<ul>{
					todoList.map(
						(todoItem, index) => {
							let line = todoItem.done ? "line-through" : "";
							return (
								<li key={todoItem.id}>
									<label>
										<input 
											type="checkbox" 
											onChange={this.updateTodo} 
											checked={todoItem.done} 
											className="cbx" 
											value={todoItem.id} 
										/>
										<span className={line}>{todoItem.text}</span>
									</label>
									<a className="del" onClick={this.delTodo} href="javascript:;" id={todoItem.id}>X</a>
								</li> 
							)
						}
					)
				}</ul>
				<div className="footer">
					<input type="text" className="ipt" placeholder="请输入..." ref="addTodoIpt"/>
					<a href="javascript:;" className="btn" onClick={this.addTodo}>添加</a>
				</div>
			</div>
		)
	}
})

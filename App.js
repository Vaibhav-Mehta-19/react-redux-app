import React,{Component} from 'react';
import Cardlist from './Cardlist';
import Search from './Search';
import Scroll from './Scroll';
import {setSearchField} from './Actions.js'
import {connect} from 'react-redux'
const mapStateToProps = state =>
{
	return{
		searchField: state.searchField
	}
}
const mapDispatchToProps = (dispatch) =>
{
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}
class App extends Component {
	constructor()
	{
		super()
		this.state={
		robots: []		
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=>response.json())
		.then(users => {this.setState({robots:users})});
	}
	render(){
	const {searchField , onSearchChange} = this.props;
	const filterrob  = this.state.robots.filter(robot =>{
		return robot.name.toLowerCase().includes(searchField.toLowerCase())
	})
	if(this.state.robots.length===0)
	{
		return <h1>Loading</h1>
	}
	else
	{
		return(
			<div className='tc'>
				<h1 className='bg-yellow underline f1 bold'> RoboFriends </h1>
				<Search className='' searchchange={onSearchChange}/>
				<Scroll>
					<Cardlist robots={filterrob}/>
				</Scroll>
			</div>
		);	
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';

//A sState property can be created for any class extending Component. State is managed from inside a component. It is somethign like the class variable
class App extends Component {
  
  //State is a javascript object
  state = {
    persons : [
      { name: "Bandana", age: 24},
      { name: "Kishan", age: 25}
    ],
    someValue : "something"
  }

  switchNameHandler = (newName) => {
    /* Dont mutate the state directly. Use setState from Component
       this.state.persons[0].name = "Bandana Singh";  */
    this.setState({
      persons : [
        { name: newName, age: 24},
        { name: "Kishan Raval", age: 25}
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: "Bandana Singh", age: 24},
        { name: event.target.value, age: 25}
      ]
    })
  }

  render() {
    //Second way of adding styles, by js object
    const style = {
      backgroundColor : 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={this.switchNameHandler.bind(this, "Bandana Singh")}>Switch Names!</button>
        <Person 
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, "Bandana!")}
          >My hobby is trekking</Person>
        <Person 
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          changed={this.nameChangedHandler}/>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
  }
}

export default App;

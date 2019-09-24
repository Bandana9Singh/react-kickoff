import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';

//A sState property can be created for any class extending Component. State is managed from inside a component. It is somethign like the class variable
class App extends Component {
  
  //State is a javascript object
  state = {
    persons: [
      { id:'dfgh', name: "Bandana", age: 24},
      { id:'tyjk', name: "Kishan", age: 25}
    ],
    otherState: "some other state",
    showPersons: false
  }
  /*
  switchNameHandler = (newName) => {
    Dont mutate the state directly. Use setState from Component
    this.state.persons[0].name = "Bandana Singh"; 
    this.setState({
      persons: [
        { name: newName, age: 24},
        { name: "Kishan Raval", age: 25}
      ]
    })
  } */

  deletePersonHandler = (personIndex) => {
    //In js objects and arrays are referenced types. Here the slice without argument copies the entire array to the const.
    //const persons = this.state.persons.slice();
    //An alternative to slice will be to use ES6 spread operator. Always update state with immutable approach.
    const persons = [...this.state.persons];
    /* Here we are mutating the original data. A good practise is create a copy of your array before manipulating it.
    Call slice for that in above statement. */
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }
  //id is added to get the person's id that will be updated
  nameChangedHandler = (event, id) => {
    //Find is the default JS method that gives us this person. 
    //Unlike map where we return to new array, this return true or false if this is the person we were looking for.
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    //As earlier do not mutate it directly, so the better approach here is to get the JS object
    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
    /* Another approach for this will be 
    const person = Object.assign({}, this.state.persons[personIndex]); */
    /*this.setState({
      persons: [
        { name: "Bandana Singh", age: 24},
        //Get the value that user entered
        { name: event.target.value, age: 25}
      ]
    }) */
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  //Everything under render gets executed when this component is rendered
  render() {
    //Second way of adding styles, by js object
    const style = {
      backgroundColor : 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;
    if (this.state.showPersons === true) {
      persons = (
        <div>
          {/* map() converts a given array such the persons here into something else. Here we are mapping to a new array.
          It does it by executing a method on every element in a given array. It takes the element of the array as input.
          Map method also exposes a second argument index, with 2 argument use bracket*/}
          { 
            this.state.persons.map ((person, index) => {
              //Here the react is rerendering the whole list, which is a problem when the list is huge.Key property allows react to keep track of the element
              return <Person 
                name={person.name} 
                age={person.age} 
                click={() => this.deletePersonHandler(index)}
                key={person.id}
                changed = {(event) => this.nameChangedHandler(event, person.id)}/>
            })
          }
          {/* <Person 
            name={this.state.persons[0].name}
            age={this.state.persons[0].age}
            click={this.switchNameHandler.bind(this, "Bandana!")}
          >My hobby is trekking</Person>
          <Person 
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            changed={this.nameChangedHandler}/>
          */}  
        </div>
      );
    }
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons!</button>
        {/* An JSX comment for the first way of writing if statement, ternary expression
        {
          this.state.showPersons === true ?
            <div>
              <Person 
                name={this.state.persons[0].name}
                age={this.state.persons[0].age}
                click={this.switchNameHandler.bind(this, "Bandana!")}
                >My hobby is trekking</Person>
              <Person 
                name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                changed={this.nameChangedHandler}/>
            </div> : null
        }  */}
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
  }
}

export default App;

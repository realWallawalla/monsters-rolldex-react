import React, { Component } from 'react';
import './App.css';
import { CardList } from './component/card-list/card-list.component';
import { SearchBox } from './component/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };

    //this.handleChange = this.handleChange.bind(this);  bind sets the context of the handleChange function. Default behavouir in javascript is that fuctions does not set context.
                                                      // Therefor by using bind(this). Binds the class app context to the handleChange function.
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters: users}));
  }

  handleChange = (e) => {
    this.setState({searchField: e.target.value}) // arrow funtions automatically binds contexts where they are defined. dont have to bind context. called lexical scooping.
  }
  
  render() {
    const { monsters, searchField } = this.state;
    //const monsters = this.state.monsters;
    //const searchField = this.state.searchField;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
      //changing state in input causes render to be recalled. which will update filteredmonsters. 
    return (
      <div className="App">
      <h1>Monsters RollerDex</h1>
      <SearchBox 
        placeholder='search monsters' 
        handleChange={this.handleChange}>
      </SearchBox>
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    )
  }
}
export default App;

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  state = {
    example: ""
  };


  fetchData = (gameName) => {
    this.setState({
      example: gameName
    })
};

  render() {
    return (
      <>
        <NavBar handleAtParent={this.fetchData}/>
        <Main name={this.state.example}/>
        <Footer />
      </>
    )
  }
}

export default App;

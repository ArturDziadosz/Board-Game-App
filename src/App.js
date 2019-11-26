import React, {Component} from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  state = {
    gameName: "",
    api: "https://www.boardgameatlas.com/api/search?client_id=GNWr07oYDD",
    data: false,
    skip: 0
  };


  fetchData = (gameName) => {
    this.setState({
      gameName,
      skip: 0
    }, () => {

      fetch(`${this.state.api}&name=${this.state.gameName}&limit=6`).then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Connection problem");
        }
      }).then(data => {
        this.setState({
          data: data.games
        });
      }).catch(err => console.log(err));
    });
  };

  fetchNextData = (skip) => {
    this.setState({
      skip
    }, () => {

      fetch(`${this.state.api}&name=${this.state.gameName}&limit=6&skip=${this.state.skip*6}`).then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Connection problem");
        }
      }).then(data => {
        this.setState(state => {
          const newArray = [...this.state.data, ...data.games];
          return {data: newArray}
        });
      }).catch(err => console.log(err));
    });
  };

  render() {
    return (
      <>
        <NavBar handleAtParent={this.fetchData}/>
        <Main gameData={this.state.data} skip={this.state.skip} gameName={this.state.gameName} handlePageCounter={this.fetchNextData} />
        <Footer/>
      </>
    )
  }
}

export default App;

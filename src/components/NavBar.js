import React, {Component} from "react";

import './NavBar.scss';

class NavBar extends Component {
  state = {
    gameName: "",
    searchedName: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.gameName === "") {
      return null
    }
    this.props.handleAtParent(this.state.gameName);
    this.setState({
      searchedName: this.state.gameName,
      gameName: ""
    })
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleClear = e => {
    e.preventDefault();
    this.setState({
      gameName: ""
    })
  };

  render() {
    return (
      <>
        <header>
          <section className={"container"}>
            <h2>Board Game App</h2>
            <form onSubmit={this.handleSubmit} >
              <input name={"gameName"} type={"text"} value={this.state.gameName} placeholder={(this.state.searchedName === "") ? `Go for it!` : `You searched for: ${this.state.searchedName}`} onChange={this.handleChange}/>
              <button>Search</button>
              <button onClick={this.handleClear}>x</button>
            </form>
          </section>
        </header>
      </>
    );
  }
}

export default NavBar;

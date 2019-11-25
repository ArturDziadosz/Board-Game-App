import React, {Component} from "react";

import './NavBar.scss';

class NavBar extends Component {
  state = {
    gameName: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAtParent(this.state.gameName);
    this.setState({
      gameName: ""
    })
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render() {
    return (
      <>
        <header>
          <section className={"container"}>
            <h2>Board Game App</h2>
            <form onSubmit={this.handleSubmit}>
              <input name={"gameName"} type={"text"} value={this.state.gameName} onChange={this.handleChange}/>
              <button>x</button>
              <button>Search</button>
            </form>
          </section>
        </header>
      </>
    );
  }
}

export default NavBar;

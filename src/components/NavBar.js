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
    });
    this.props.handleSearch();
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

  handleReload = e => {
    e.preventDefault();
    this.props.handleParentReload();
  };

  handleExact = e => {
    e.preventDefault();
    this.props.handleParentExact();
    console.log(e.target);
    e.currentTarget.classList.toggle("pressed");
  };

  handleExplanationEnter = e => {
    e.currentTarget.nextElementSibling.style.display = "block";
  };

  handleExplanationLeave = e => {
    e.currentTarget.nextElementSibling.style.display = "none";
  };

  render() {
    return (
      <>
        <header>
          <section className={"container"}>
            <h2><a href={"#"} onClick={this.handleReload}>Board <span>Game</span> App</a></h2>
            <form onSubmit={this.handleSubmit} >
              <input id="placeholder" name={"gameName"} type={"text"} value={this.state.gameName} placeholder={(this.state.searchedName === "") ? `Search for awesome games!` : `You searched for: ${this.state.searchedName}`} onChange={this.handleChange}/>
              <button onMouseEnter={this.handleExplanationEnter} onMouseLeave={this.handleExplanationLeave}><i className="fas fa-play"/></button>
              <div className={"explanation"} style={{display: "none"}}>Search</div>
              <button onMouseEnter={this.handleExplanationEnter} onMouseLeave={this.handleExplanationLeave} onClick={this.handleClear}><i className="fas fa-square"/></button>
              <div className={"explanation"} style={{display: "none"}}>Clear</div>
              <button onMouseEnter={this.handleExplanationEnter} onMouseLeave={this.handleExplanationLeave} onClick={this.handleExact}><i className="fas fa-circle"/></button>
              <div className={"explanation"} style={{display: "none"}}>Exact searching</div>
            </form>
          </section>
        </header>
      </>
    );
  }
}

export default NavBar;

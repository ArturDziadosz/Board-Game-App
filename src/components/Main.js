import React, {Component} from "react";

import './Main.scss';

class Main extends Component {
  state = {
    pageCounter: this.props.skip + 1,
    isDisabled: false,
    isBig: false
  };

  handleMoreBtn = e => {
    this.setState(state => {
      return {
        pageCounter: state.pageCounter + 1
      }
    });
    this.props.handlePageCounter(this.state.pageCounter);
  };

  handleMakeBig = e => {
    e.target.classList.toggle("show")
  };

  componentDidUpdate(prevProps) {
    if ((prevProps.skip !== this.props.skip) && (this.props.skip === 0)) {
      this.setState({
        pageCounter: this.props.skip + 1
      })
    }
    if ((prevProps.gameData !== this.props.gameData) && (this.props.gameData.length < (this.state.pageCounter * 6))) {
      this.setState({
        isDisabled: true
      })
    }
  }

  render() {
    const {gameData} = this.props;
    if (!gameData) {
      return (
        <>
          <main>
            <section className={"container"}>
              <div className={"row"}>
                <div className={"col-16 start"}>Start</div>
                <div className={"col-16 top3"}>TOP 3</div>
                <div className={"col-11 kickstarter"}>Kickstarter</div>
                <div className={"col-4 random"}>Random</div>
              </div>
            </section>
          </main>
        </>
      )
    }

    if (gameData.length === 0) {
      return (
        <>
          <main>
            <section className={"container"}>
              <div className={"row"}>
                <div className={"col-16 noMatch"}>No Matching criteria for {this.props.gameName}</div>
                <div className={"col-16 top3"}>TOP 3</div>
                <div className={"col-11 kickstarter"}>Kickstarter</div>
                <div className={"col-4 random"}>Random</div>
              </div>
            </section>
          </main>
        </>
      )
    }

    if (gameData.length === 1) {
      return (
        <>
          <main>
            <section className={"container"}>
              <div className={"row"}>
                <div className={"col-16 big"} style={{backgroundImage: `url(${gameData[0].images.large})`}}>
                  <p>{gameData[0].name} ({gameData[0].year_published})</p></div>
              </div>
            </section>
          </main>
        </>
      )
    }

    return (
      <>
        <main>
          <section className={"container"}>
            <div className={"row"}>
              {
                gameData.map(game => {
                  return (
                    <div onClick={this.handleMakeBig} key={game.id} className={"col-4 game"}
                         style={{backgroundImage: `url(${game.images.medium})`}}>
                      {game.year_published ? <p>{game.name} ({game.year_published})</p> : <p>{game.name}</p>}
                    </div>
                  )
                })
              }
              {
                this.state.isDisabled ?
                  <button className={"col-2 more"} onClick={this.handleMoreBtn} disabled={true}>That's all!</button> :
                  <button className={"col-2 more"} onClick={this.handleMoreBtn} disabled={false}>More ...</button>
              }
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Main;

import React, {Component} from "react";
import Mechanics from "./data/mechanics";
import Categories from "./data/categories";

import './Main.scss';

class Main extends Component {
  state = {
    pageCounter: this.props.skip + 1,
    isDisabled: false,
    isBig: false,
    recommendationByMechanics: <div></div>,
    recommendationByCategories: <div></div>,
    top3: false,
    kickstarter: false,
    random: false,
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
    const gameName = (e.target.children[0].innerText.split(" (")[0]);
    this.setState(state => {
      return {
        isBig: true
      }
    }, () => {

      if (this.state.isBig) {
        this.props.handleMakeBig(gameName);
      }
    })

  };

  handleMakeSmall = e => {
    this.setState({
      isBig: false,
    }, () => {
      if (!this.state.isBig) {
        this.props.handleMakeSmall("");
      }
    })
  };

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.skip !== this.props.skip) && (this.props.skip === 0)) {
      this.setState({
        pageCounter: this.props.skip + 1,
        isDisabled: false
      })
    }
    if ((prevProps.gameData !== this.props.gameData) && (this.props.gameData.length < (this.state.pageCounter * 6))) {
      this.setState(state => {
        return {
          isDisabled: true
        }
      })
    }

    if (prevProps.searchCount !== this.props.searchCount) {
      this.setState({
        recommendationByMechanics: <div></div>,
        recommendationByCategories: <div></div>
      })
    }

    if (prevProps.exact !== this.props.exact) {
      this.setState({
        isBig: this.props.exact
      })
    }

    if (prevProps.searched !== this.props.searched) {
      this.setState({
        isBig: false,
        isDisabled: false
      })
    }
  }

  converterMechanics = id => {
    let matches;
    Mechanics.mechanics.filter(val => {
      if (val.id === id) {
        matches = val.name;
      }
    });
    return <li key={id}><i className="fas fa-chess-rook"/>{matches}</li>
  };

  converterCategories = id => {
    let matches;
    Categories.categories.filter(val => {
      if (val.id === id) {
        matches = val.name;
      }
    });
    return <li key={id}><i className="fas fa-dice-d6"/>{matches}</li>
  };

  bestByMechanics = id => {
    fetch(`${this.props.api}&mechanics=${id}&order_by=popularity`).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Connection problem");
      }
    }).then(data => {
      const randomNumber = Math.floor(Math.random() * data.games.length) + 1;
      this.setState({
        recommendationByMechanics: <div className={"col-10 game"} onClick={this.handleMakeBig}
                                        style={{backgroundImage: `url(${data.games[randomNumber].images.medium})`}}>{data.games[randomNumber].year_published ?
          <p>{data.games[randomNumber].name} ({data.games[randomNumber].year_published})</p> :
          <p>{data.games[randomNumber].name}</p>}</div>
      })
    }).catch(err => console.log(err));
  };

  bestByCategories = id => {
    fetch(`${this.props.api}&categories=${id}&order_by=popularity`).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Connection problem");
      }
    }).then(data => {
      const randomNumber = Math.floor(Math.random() * data.games.length) + 1;

      // if (!data.games) {
      //   this.setState( {
      //     recommendationByCategories: <div className={"col-10 game"} style={{backgroundColor: "#123456"}}><p>Upssss :( <br/> No recommendations :(</p></div>
      //   })
      // }
      this.setState({
        recommendationByCategories: <div className={"col-10 game"} onClick={this.handleMakeBig}
                                         style={{backgroundImage: `url(${data.games[randomNumber].images.medium})`}}>{data.games[randomNumber].year_published ?
          <p>{data.games[randomNumber].name} ({data.games[randomNumber].year_published})</p> :
          <p>{data.games[randomNumber].name}</p>}</div>
      })
    }).catch(err => console.log(err));
  };

  genRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  componentDidMount() {
    fetch(`${this.props.api}&limit=10&order_by=popularity`).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Connection problem");
      }
    }).then(data => {
      let popularArray = [];
      popularArray.push(data.games[this.genRandomNumber(0, 3)]);
      popularArray.push(data.games[this.genRandomNumber(4, 6)]);
      popularArray.push(data.games[this.genRandomNumber(7, 9)]);

      this.setState({
        top3: popularArray
      })
    }).catch(err => console.log(err));

    fetch(`${this.props.api}&kickstarter=true&limit=2&order_by=deadline`).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Connection problem");
      }
    }).then(data => {
      let kickstarterArray = [];
      kickstarterArray.push(data.games[this.genRandomNumber(1, 3)]);
      kickstarterArray.push(data.games[this.genRandomNumber(4, 7)]);
      this.setState({
        kickstarter: kickstarterArray
      })
    }).catch(err => console.log(err));

    this.fetchRandomGame();

  }

  fetchRandomGame = () => {
    fetch(`${this.props.api}&random=true`).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Connection problem");
      }
    }).then(data => {
      this.setState({
        random: data.game
      })
    }).catch(err => console.log(err));

  };

  render() {
    const {gameData} = this.props;
    const {kickstarter} = this.state;

    if ((gameData.length === 0) || (!gameData)) {
      return (
        <>
          <main>
            <section className={"container"}>
              <div className={"row rowStart"}>
                {!gameData ?
                  <div className={"col-16 start"}>Hi! My name is Artur Dziadosz. <span>I'm a Junior Front-end developer and
                    board game geek. </span><br/> I made this site just for a training purpose. <span>It's a simple search site based
                    on great <a href={"https://www.boardgameatlas.com/"} target={"_blank"}>Board Game Atlas
                      API</a>.</span> <br/>It has small features including: <span>most popular games, kickstarter games, random game, recommended
                    games.</span><br/> I hope you will enjoy it! May the best game be with you!
                  </div> :
                  <div className={"col-16 noMatch"}><span>Oopssssssssss :(</span> <br/> No matching criteria for searched
                    sentence: "{this.props.gameName}". <br/> If you are using exact search be aware of first letter in searched word it should be capitalized. <br/></div>}

                <div className={"col-16 top3"}>
                  <div className={"dashboard"}>{!this.state.top3 ? <div className={"col-16 rotate"} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "300px", fontSize: "10em"}}>
                    <i className="fas fa-dice-five" style={{color: "#123456"}}></i></div> : this.state.top3.map(game => {
                    return <div key={game.id} className={"col-4 game"} onClick={this.handleMakeBig}
                                style={{backgroundImage: `url(${game.images.medium})`}}>{game.year_published ?
                      <p>{game.name} ({game.year_published})</p> : <p>{game.name}</p>}</div>
                  })}
                    <div className={"top3Title title"}>Popu<span>lar ga</span>mes!</div>
                  </div>
                </div>
              </div>
              <div className={"row rowKickstarter"}>

                <div className={"col-6 random"}>
                  <div className={"container dashboard"}>
                    <div className={"title randomTitle"} onClick={this.fetchRandomGame}>Roll <span>the</span> dice!</div>
                    {
                      !this.state.random ? <div className={"col-16 rotate"} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "300px", fontSize: "10em"}}>
                        <i className="fas fa-dice-five" style={{color: "#123456"}}></i></div> : <div className={"col-10 game"} onClick={this.handleMakeBig}
                                                            style={{backgroundImage: `url(${this.state.random.images.medium})`}}>{this.state.random.year_published ?
                        <p>{this.state.random.name} ({this.state.random.year_published})</p> :
                        <p>{this.state.random.name}</p>}</div>
                    }
                  </div>
                </div>

                <div className={"col-10 kickstarter"}>
                  <div className={"dashboard"}>{!kickstarter ? <div className={"col-16 rotate"} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "300px", fontSize: "10em"}}>
                      <i className="fas fa-dice-five" style={{color: "#123456"}}></i></div> :
                    <>
                      <div key={kickstarter[0].id}
                           className={"col-4 game"} onClick={this.handleMakeBig}
                           style={{backgroundImage: `url(${kickstarter[0].images.medium})`}}>{kickstarter[0].year_published ?
                        <p>{kickstarter[0].name} ({kickstarter[0].year_published})</p> :
                        <p>{kickstarter[0].name}</p>}</div>
                      <div key={kickstarter[1].id}
                           className={"col-4 game"} onClick={this.handleMakeBig}
                           style={{backgroundImage: `url(${kickstarter[1].images.medium})`}}>{kickstarter[1].year_published ?
                        <p>{kickstarter[1].name} ({kickstarter[1].year_published})</p> :
                        <p>{kickstarter[1].name}</p>}</div>
                    </>}
                    <div className={"title"}>Kick<span>star</span>ter</div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )
    }

    if ((gameData.length === 1) || (this.state.isBig)) {
      if ((!this.state.recommendationByMechanics.props.children) && (!this.state.recommendationByCategories.props.children)) {
        if (gameData[0].mechanics.length !== 0) {
          this.bestByMechanics(gameData[0].mechanics[0].id);
        }
        if (gameData[0].categories.length !== 0) {
          this.bestByCategories(gameData[0].categories[0].id);
        }
      }
      return (
        <>
          <main>
            <section className={"container"}>
              <div className={"row"}>
                <div className={"col-16 big"}>
                  <div className={"left"}>
                    <div className={"leftUp"}>
                      <a href={gameData[0].official_url} target={"_blank"} className={"leftUpLeft game"}>
                        <div
                          style={{backgroundImage: `url(${gameData[0].images.medium})`}}>{gameData[0].year_published ?
                          <p>{gameData[0].name} ({gameData[0].year_published})</p> :
                          <p>{gameData[0].name}</p>}
                        </div>
                      </a>
                      <div className={"leftUpMiddle"}>
                        <ul>
                          {(gameData[0].min_players && gameData[0].max_players) ?
                            <li><i className="fas fa-user-friends"/> Players:<br/> <span>min: {gameData[0].min_players} max: {gameData[0].max_players}</span>
                            </li> : null}
                          {(gameData[0].min_playtime && gameData[0].max_playtime) ?
                            <li><i className="fas fa-clock"/> Playtime:<br/>
                              <span>min: {gameData[0].min_playtime} max: {gameData[0].max_playtime} min</span>
                            </li> : null}
                          {gameData[0].min_age ? <li><i className="fas fa-child"/> Min age: <br/><span>{gameData[0].min_age} years</span></li> : null}
                          {gameData[0].primary_publisher ?
                            <li><i className="fas fa-building"/> Publisher: <br/><span>{gameData[0].primary_publisher}</span></li> : null}
                          {gameData[0].designers ?
                            <li><i className="fas fa-pencil-alt"/> Designer: <br/><span>{gameData[0].designers[0]}</span></li> : null}
                          {gameData[0].artists ? <li><i className="fas fa-palette"/> Artist: <br/><span>{gameData[0].artists[0]}</span></li> : null}
                          {gameData[0].num_user_ratings ?
                            <li><i className="fas fa-users"/> User ratings: <br/><span>{gameData[0].num_user_ratings}</span></li> : null}
                          {gameData[0].average_user_rating ?
                            <li><i className="fas fa-thumbs-up"/> Avg rating: <br/><span>{gameData[0].average_user_rating.toFixed(2)}</span></li> : null}
                          {/*{gameData[0].weight_amount ? <li>Weight: {gameData[0].weight_amount}</li> : null}*/}
                          {/*{gameData[0].weight_units ? <li>{gameData[0].weight_units}</li> : null}*/}
                          {/*{gameData[0].size_height ? <li>Size: {gameData[0].size_height}</li> : null}*/}
                          {/*{gameData[0].size_width ? <li>{gameData[0].size_width}</li> : null}*/}
                          {/*{gameData[0].size_depth ? <li>Depth: {gameData[0].size_depth}</li> : null}*/}
                          {/*{gameData[0].size_units ? <li>{gameData[0].size_units}</li> : null}*/}
                          {/*{gameData[0].official_url ?*/}
                          {/*  <li><a href={gameData[0].official_url} target={"_blank"}>Official</a></li> : null}*/}
                          {/*{gameData[0].names ? <li>Names: {gameData[0].names}</li> : null}*/}
                          {((gameData[0].url) || (gameData[0].rules_url)) ?
                            <li>
                              <div style={{display: "flex", justifyContent: "space-between", marginTop: "5px"}}>
                                <a href={gameData[0].url} target={"_blank"}>Board Game Atlas</a>
                                <span className={"inline"}>
                                <a href={gameData[0].rules_url} target={"_blank"}>Rules <i className="fas fa-file-download"/></a>
                              </span>
                              </div>
                            </li> : null}
                          {/*{gameData[0].rules_url ?*/}
                          {/*  <li><a href={gameData[0].rules_url} target={"_blank"}>Rules</a></li> : null}*/}
                        </ul>
                      </div>
                      <div className={"leftUpRight"}>
                        <div className={"mechanics"}>
                          <p>Me<span>chan</span>ics:</p>
                          <ul>
                            {
                              gameData[0].mechanics.map(elem => {
                                return (
                                  this.converterMechanics(elem.id)
                                )
                              })
                            }
                          </ul>
                        </div>
                        <div className={"mechanics categories"}>
                          <p>Cat<span>egor</span>ies:</p>
                          <ul>
                            {
                              gameData[0].categories.map(elem => {
                                return (
                                  this.converterCategories(elem.id)
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className={"leftDown"}>
                      <div className={"descriptionTitle"}>Des<span>crip</span>tion</div>
                      <div className={"description"} dangerouslySetInnerHTML={{__html: gameData[0].description}}/>
                    </div>
                  </div>
                  <div className={"right"}>
                    <div className={"rightTitle"}>
                      <p className={"banner bannerTop"}>Reco<span>mmenda</span>tions</p>
                      <div className={"banner diceSmall"}><i className="fas fa-dice"></i></div>
                    </div>
                    <div className={"rightUp"}>
                      <div className={"banner"}>by <span>mecha</span>nics</div>
                      {this.state.recommendationByMechanics}
                    </div>
                    <div className={"rightDown"}>
                      <div className={"banner"}>by <span>catego</span>ries</div>
                      {this.state.recommendationByCategories}
                    </div>
                  </div>
                  <button onClick={this.handleMakeSmall} className={"cancel"}><i className="fas fa-eject"/></button>
                </div>

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
                  <button className={"col-2 more"} disabled={true}><a href={"#"}>That's <span>all! Search</span> for
                    more?</a></button> :
                  <button className={"col-2 more"} onClick={this.handleMoreBtn}
                          disabled={false}><a>More <span>awesome</span> games...</a></button>
              }
              <button className={"col-1 more"} disabled={true}><a href={"#"}><i className="fas fa-arrow-circle-up"/></a>
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Main;

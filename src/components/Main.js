import React, {Component} from "react";

import './Main.scss';

class Main extends Component {
  render() {
    return (
      <>
        <main>
          <section className={"container"}>
            <div className={"row row1"}>
              <div className={"col-4"}>
                <p>{this.props.name}</p>
              </div>
              <div className={"col-4"}>
              </div>
              <div className={"col-4"}>
              </div>
            </div>
            <div className={"row row2"}>
              <div className={"col-4"}>
              </div>
              <div className={"col-4"}>
              </div>
              <div className={"col-4"}>
              </div>
            </div>
            <div className={"row row3"}>
              <div className={"col-4"}>
              </div>
              <div className={"col-4"}>
              </div>
              <div className={"col-4"}>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Main;

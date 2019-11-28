import React, {Component} from "react";

import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <>
        <footer>
          <section className={"container"}>
            <p>The literal and graphical information presented on this site about Board Games, including component images, card images, rules images, and box images, and all other related items is copyright of each respective game Publisher. This website is not produced by, endorsed by, supported by, or affiliated with any publisher.</p>
            <p className={"icons"}><a href={"https://www.instagram.com/darturo_/"} target={"_blank"}><i className="fab fa-instagram"/></a><a href={"https://www.linkedin.com/in/artur-dziadosz-938680184/"} target={"_blank"}><i className="fab fa-linkedin"/></a><a href={"https://github.com/ArturDziadosz"} target={"_blank"}><i className="fab fa-github"/></a></p>
            <p>Copyright © 2019 / Created by <a href={"https://github.com/ArturDziadosz"} target={"_blank"}>Artur Dziadosz</a></p>
          </section>
        </footer>
        </>
    );
  }
}

export default Footer;

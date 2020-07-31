import React, { Component } from "react";
import logo from "../logo.svg";
class Home extends Component {
  state = {};
  render() {
    return (
      <div className="text-center">
        <img src={logo} alt="" style={{ height: "300px", width: "300px" }} />
        <h1 className="mt-0" style={{
          color: "#1bc3cc",fontWeight:500 ,fontFamily: "monospace",
  letterSpacing: 5 }}>
          WELCOME TO ESHOP
        </h1>
      </div>
    );
  }
}

export default Home;

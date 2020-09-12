import WondersUi from "./js/components/WondersUi";
import React, { Component } from "react";
import ReactDOM from "react-dom";


const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<WondersUi  />, wrapper) : false;
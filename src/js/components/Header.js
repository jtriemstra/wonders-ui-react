import React, { Component } from "react";
import Utility from "../Utility"

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleEnd = this.handleEnd.bind(this);        
        //this.handleList = this.handleList.bind(this);        
    }
    
    handleEnd(e) {
        if (e) e.preventDefault();

        fetch(Utility.apiServer() + "/endGame?gameName=" +this.props.gameName)
        .then(res => {
            if (res.ok) { return true; }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                document.cookie = "playerName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.reload();
            }
        });
    }

    render() {
        return (
            <div className="header-div">
            <button onClick={this.handleEnd}>End Game</button>
            </div>
        );
    }
}

export default Header;
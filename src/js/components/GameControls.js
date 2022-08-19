import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility"

class GameControls extends Component {
    constructor() {
      super();      
      this.handleEnd = this.handleEnd.bind(this);
      this.handleHelp = this.handleHelp.bind(this);  
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
    
    handleHelp(e) {
		if (e && e.target) {
			if (e.target.checked) {
				document.querySelector("#game-container").classList.add("help-enabled");
			}
			else {
				document.querySelector("#game-container").classList.remove("help-enabled");	
			}
		}
	}

	
	render() {
		return (
			<div class="game-controls">
				<button onClick={this.handleEnd}>End Game</button>
				<label class="enable-help">
					<input type="checkbox" id="enable-help" name="enable-help" onChange={this.handleHelp} />
					Show help text for cards 					
				</label>
			</div>	
		);	
	}
}

export default GameControls;
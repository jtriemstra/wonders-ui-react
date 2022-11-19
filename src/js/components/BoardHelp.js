import React, { Component } from "react";
import ReactDOM from "react-dom";

class BoardHelp extends Component {
    constructor() {
      super();      
      
      this.handleHelp = this.handleHelp.bind(this);
    }
    
    handleHelp(event, helpIndex) {
		event.preventDefault();
		if (this.props.helpText) {
			window.alert(this.props.helpText[helpIndex]);
		}
	}
    
    render() {
	
		let helpButtons = [];
		if (this.props.helpText) {
			for (var i=0; i<this.props.helpText.length; i++){
				let thisIndex = i;
				helpButtons.push(<div className="help-button" onClick={(event) => this.handleHelp(event, thisIndex)} ><a href="#">?</a></div>);
			}	 
		}
        return (
            <div class="board-help">
                {helpButtons}
            </div>
        );
    }
}

export default BoardHelp;
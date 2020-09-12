import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";

class Choices extends Component {
    constructor() {
      super();      
      this.handleOption = this.handleOption.bind(this);
    }

    handleOption(event){
        event.preventDefault();

        let actionName = this.props.action;
        let optionName = event.target.dataset.optionname;
        var myRequest = new Request(Utility.apiServer() + "/" + actionName + "?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName() + "&optionName=" + optionName);

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.props.updateState(result);
        });
    }

    render() {
        if (this.props.options){
            return (
                <div className="popup-background">
                    <div className="popup-content">
                        {
                            this.props.options.map((option) => {
                                return <p>
                                    <a onClick={this.handleOption} data-optionname={option}>{option}</a>
                                </p>;
                            })
                        }
                    </div>
                </div>
            );
        }
        
        return null;
    }
}

export default Choices;
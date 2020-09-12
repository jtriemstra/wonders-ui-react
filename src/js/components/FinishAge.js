import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";

class FinishAge extends Component {
    constructor() {
      super();      
      this.startAge = this.startAge.bind(this);
    }

    startAge(){
        var myRequest = new Request(Utility.apiServer() + "/startAge?playerId=" + this.props.playerName + "&gameName=" + this.props.gameName);

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.props.startAge(result);
        });
  }

    render() {
            let victories = this.props.victories ? this.props.victories : 0;
            let defeats = this.props.defeats ? this.props.defeats : 0;

            return (
                <div className="popup-background">
                    <div className="popup-content">
                        <h3>Age Complete!</h3>
                        {victories} victories
                        {defeats} defeats
                        <button onClick={this.startAge}>Start Age</button>
                    </div>
                </div>
            );
        
        
        
    }
}

export default FinishAge;
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Waiting extends Component {
    constructor() {
      super();      
      
    }

    render() {
        if (this.props.isWaiting){
            return (
                <div className="popup-background">
                    <div className="popup-content">Waiting</div>
                </div>
            );
        }
        
        return null;
    }
}

export default Waiting;
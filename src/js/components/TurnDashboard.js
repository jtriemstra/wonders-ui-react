import React, { Component } from "react";

class TurnDashboard extends Component {
    render() {
        const playerState = this.props.playerState;

        if (!this.props.isCurrentPlayer){
            return (<div className="turn-dashboard"></div>);
        }
        return (
            <div className="turn-dashboard">
                <div className="turn-dashboard-item">
                    <h3>Actions Remaining: </h3>
                    <p>{playerState.numberOfActions}</p>
                </div>
                <div className="turn-dashboard-item">
                    <h3>Buys Remaining: </h3>
                    <p>{playerState.numberOfBuys}</p>
                </div>
                <div className="turn-dashboard-item">
                    <h3>Treasure Available: </h3>
                    <p>{playerState.treasureAvailable}</p>
                </div>
            </div>
        );
    }
}

export default TurnDashboard;
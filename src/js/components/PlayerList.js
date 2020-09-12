import React, { Component } from "react";

class PlayerList extends Component {
    render() {
        const playerNames = this.props.playerNames;
        const currentPlayerIndex = this.props.currentPlayerIndex;

        return (
            <div className="player-list">
                <h2>Players: </h2>
                <ul>
                    {playerNames.map((name, index) => <li className={index===currentPlayerIndex ? 'active' : ''}>{name}</li>)}
                </ul>
            </div>
        );
    }
}

export default PlayerList;
import React, { Component } from "react";
import Utility from "../Utility";
import BoardImage from "../BoardImage";

class ChooseBoard extends Component {
    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);        
    }

    handleSave(event, boardName, boardSide, confirm) {
        event.preventDefault();
        console.log(boardName);
        console.log(boardSide);

        this.props.timeoutClear();

        fetch(Utility.apiServer() + "/chooseBoard?gameName=" + this.props.gameName + "&playerId=" + this.props.playerName + "&boardName=" + boardName + "&boardSide=" + boardSide + "&skip=" + confirm) 
        .then(res => res.json())
        .then((result) => {
            if (result){
                this.props.onGameStart(result);
            }
        });
    }

    render() {
        let boardUses = this.props.boardUses;
        let boardList = [];
        let boardSides = ["A","B"];
        let currentFlag = null;

        for (var boardNameKey in boardUses){
            for (var j=0; j<boardSides.length; j++) {
                let boardSide = boardSides[j];
                let boardName = boardNameKey;
                if (boardName === this.props.currentBoard && boardSide === this.props.currentSide){
                    currentFlag = <div className="current-board">Current <button onClick={(event) => this.handleSave(event, boardName, boardSide, true)}>Confirm this Board</button></div>;
                }
                else {
                    currentFlag = null;
                }
                let cssClass = boardUses[boardName] ? "board-taken" : "board-available";
                if (boardName === this.props.currentBoard && boardSide != this.props.currentSide){
                    cssClass = "board-available";
                }
                let img = <img src={"images/boards/" + BoardImage.getImage(boardName, boardSide)}></img>;
                let link = (cssClass === "board-available") ? <a href="#" onClick={(event) => this.handleSave(event, boardName, boardSide, false)}>{img}</a> : img;
                boardList.push(<div className={cssClass}>{currentFlag}{link}</div>);
            }            
        }

        return (
            <div className="board-list">
                {boardList}
            </div>
        );
    }
}

export default ChooseBoard;
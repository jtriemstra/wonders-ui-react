import React, { Component } from "react";
import ReactDOM from "react-dom";

class Tray extends Component {
    constructor() {
      super();      
      
    }

    renderVictories() {
        let result = [];
        if (this.props.allVictories){
            if (this.props.allVictories["1"]) {
                for (var i=0; i<this.props.allVictories["1"].length; i++){
                    result.push(<img src="../../images/icons/victory1.png" />);
                }
            }
            if (this.props.allVictories["2"]) {
                for (var i=0; i<this.props.allVictories["2"].length; i++){
                    result.push(<img src="../../images/icons/victory3.png" />);
                }
            }
            if (this.props.allVictories["3"]) {
                for (var i=0; i<this.props.allVictories["3"].length; i++){
                    result.push(<img src="../../images/icons/victory5.png" />);
                }
            }
        }
        return <div class="victories">{result}</div>;
    }

    renderDefeats() {
        let result = [];
        for (var i=0; i<this.props.allDefeats; i++){
            result.push(<img src="../../images/icons/victoryminus1.png" />);
        }
        return <div class="defeats">{result}</div>;
    }

    render() {
        let discards = [];
        if (this.props.discards) {
            discards.push(<span>Discards<br></br></span>);
            for(var i=0; i<3; i++){
                for (var j=0; j<this.props.discards[i]; j++){
                    discards.push(<img src={"../../images/cards/age" + (i+1) + ".png"} />);
                }
            }
        }

        return (
            <div class="tray">
                <div class="discards">
                    {discards}
                </div>        
                <div class="coins">
                    <span class="coin-wrapper">
                        <span class="coin-background">{this.props.coins}</span>
                    </span>
                </div>
                {this.renderVictories()}
                {this.renderDefeats()}
            </div>
        );
    }
}

export default Tray;
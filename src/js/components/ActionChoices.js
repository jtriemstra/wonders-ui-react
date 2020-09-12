import React, { Component } from "react";

class ActionChoices extends Component {
    constructor(props) {
        super(props);
        
        this.handleChoice = this.handleChoice.bind(this);
    }

    handleChoice(e){
        e.preventDefault();
        let form = e.target.parentElement;
        let checkboxes = form.querySelectorAll("[name=options]");
        let selectedOptions = [];
        for (var i=0; i<checkboxes.length; i++){
            if (checkboxes[i].checked) {
                selectedOptions.push(checkboxes[i].value);
            }
        }
        
        this.props.onOptionClick(selectedOptions);
    }

    getChoiceType(){
        if (this.props.currentChoice.minOptions === 1 && this.props.currentChoice.maxOptions === 1){
            return "radio";
        }
        else {
            return "checkbox";
        }
    }

    getCardImageByName(cardName){
        //TODO: more robust check here, names could contain :
        let trueCardName = cardName.indexOf(":") >= 0 ? cardName.split(":")[1].trim() : cardName;
        return "images/200px-" + trueCardName.replace(/ /g, "_") + ".jpg"
    }

    getChoices(){
        if (this.props.currentChoice.options[0] === "Yes" || this.props.currentChoice.options[0] === "2 Cards; 1 Action"){
            const choices = this.props.currentChoice.options.map((choice) => 
                <li><label>{choice}<input type={this.getChoiceType()} value={choice} name="options" /></label></li>
            );

            return <ul>{choices}</ul>;
        }
        else {
            const choices = this.props.currentChoice.options.map((choice) => 
                    <li class='card-active'><label><img src={this.getCardImageByName(choice)} width="160px"/><input type={this.getChoiceType()} value={choice} name="options" /></label></li>
            );

            return <div class='card-set'><ul class='card-set-active'>{choices}</ul></div>;
        }
    }

    

    render() {
        if (!this.props.currentChoice){
            return (<div></div>);
        }

        const choices = this.getChoices();

        return (
            <div className="actions-background">
                <div className="actions-dialog">
                    <h2>Action</h2>
                    <p>{this.props.currentChoice.prompt}</p>
                    <form>
                        {choices}
                        <button onClick={this.handleChoice}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ActionChoices;
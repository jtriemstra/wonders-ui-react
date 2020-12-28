import React from 'react';

import  GameContainer  from '../js/components/GameContainer';

export default {
  title: 'GameContainer',
  component: GameContainer
};

const Template = (args) => <GameContainer {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
  gameState:{
    cards:[{"status":"OK","card":{"name":"Clay Pit","type":"resource"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"East Trading Post","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Marketplace","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Theater","type":"victory"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Clay Pool","type":"resource"},"cost":0,"leftCost":0,"rightCost":0},{"status":"ERR_RESOURCE","card":{"name":"Barracks","type":"army"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Lumber Yard","type":"resource"},"cost":0,"leftCost":0,"rightCost":0}],
    canBuild:true,
    nextActions:"play;discard;build",
    boardName: "Alexandria",
    boardSide: "A",
    buildState: {},
    cardsOnBoard: [],
    coins: 3,
    allVictories:{"1":[1]},
    allDefeats: 2,
    leftNeighbor:{cardsOnBoard:["Press", "Timber Yard", "West Trading Post", "Loom"], boardResource:"PAPER", name:"Test 1"},
    rightNeighbor:{cardsOnBoard:["Press", "Timber Yard", "West Trading Post", "Loom"], boardResource:"BRICK", name:"Test 2"}
  }
};

export const test2 = Template.bind({});
test2.args = {
  gameState:{
    nextActions:"startAge",
    message:null,
    cards:[],
    cardsOnBoard:[{"name":"Marketplace","type":"commerce"},{"name":"Altar","type":"victory"},{"name":"Lumber Yard","type":"resource"},{"name":"Workshop","science":{"scienceOptions":["GEAR"]},"type":"science"},{"name":"Apothecary","science":{"scienceOptions":["COMPASS"]},"type":"science"},{"name":"Lumber Yard","type":"resource"},{"name":"Lumber Yard","type":"resource"},{"name":"Lumber Yard","type":"resource"}],
    coins:1,
    buildState:[1,2,0],
    boardSide:"B",
    boardName:"Olympia",
    leftNeighbor:{boardResource:"GLASS",
      name:"test",
      cardsOnBoard:["West Trading Post","Stone Pit","Ore Vein","Baths","Theater","Clay Pool"],
      stagesBuilt:1,
      boardName:"Giza",
      boardSide:"B"
    },
    rightNeighbor:{boardResource:"BRICK",
      name:"test",
      cardsOnBoard:["Timber Yard","Clay Pit","East Trading Post","Loom","Guard Tower","Stockade"],
      stagesBuilt:2,
      boardName:"Ephesus",
      boardSide:"A"
    },
    allDefeats:1,
    allVictories:{}
  }
};

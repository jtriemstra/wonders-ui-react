import React from 'react';

import  WondersUi  from '../js/components/WondersUi';

export default {
  title: 'WondersUi',
  component: WondersUi
};

const Template = (args) => <WondersUi {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
  gameState:{
    cards:[{"status":"OK","card":{"name":"Clay Pit","type":"resource"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"East Trading Post","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Marketplace","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Theater","type":"victory"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Clay Pool","type":"resource"},"cost":0,"leftCost":0,"rightCost":0},{"status":"ERR_RESOURCE","card":{"name":"Barracks","type":"army"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Lumber Yard","type":"resource"},"cost":0,"leftCost":0,"rightCost":0}],
    canBuild:false,
    nextActions:"startAge",
    boardName: "Alexandria",
    boardSide: "A",
    buildState: {},
    boardCards: [],
    coins: 3,
    victories: 1,
    defeats: 2,
    leftNeighbor:{cardsOnBoard:["Press", "Timber Yard", "West Trading Post", "Loom"], boardResource:"PAPER"},
    rightNeighbor:{cardsOnBoard:["Press", "Timber Yard", "West Trading Post", "Loom"], boardResource:"BRICK"},
    age: 1,
    ageFinished: true,
    allDefeats:0,
    allVictories:{"1":[1,1]}
  }
};
export const test2 = Template.bind({});
test2.args = {
  gameState:{
    cards:[],
    canBuild:false,
    nextActions:"chooseScience",
    boardName: "Alexandria",
    boardSide: "A",
    buildState: {},
    boardCards: [],
    coins: 3,
    victories: 1,
    defeats: 2,
    leftNeighbor:{cardsOnBoard:["Press", "Timber Yard", "West Trading Post", "Loom"], boardResource:"PAPER"},
    rightNeighbor:{cardsOnBoard:["Press", "Timber Yard", "West Trading Post", "Loom"], boardResource:"BRICK"},
    age: 2,
    ageFinished: true,
    allDefeats:0,
    allVictories:{"1":[1,1]},
    options:["TABLET", "COMPASS", "GEAR"]
  }
};

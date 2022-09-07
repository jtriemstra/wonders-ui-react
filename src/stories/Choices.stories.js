import React from 'react';

import  Choices  from '../js/components/Choices';

export default {
  title: 'Choices',
  component: Choices
};

const Template = (args) => <Choices {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
  isWaiting: false,
  options:["test1", "test2", "test3"],
  action:"testChoice",
  updateState:x,
  playerName:"player name",
  gameName:"game name"
};

export const test2 = Template.bind({});
test2.args = {
  isWaiting: false,
  options:[{name:"test1", value:"asdf"}, {name:"test2", value:"qwer"}, {name:"test3", value:"zxcv"}],
  action:"testChoice",
  updateState:x,
  playerName:"player name",
  gameName:"game name"
};


export const test3 = Template.bind({});
test3.args = {
  isWaiting: false,
  options:[{name:"Scientists Guild", value:"Scientists Guild", help:"Some help text 1"}, {name:"Traders Guild", value:"Traders Guild", help:"Some help text 2"}, {name:"Spies Guild", value:"Spies Guild", help:"Some help text 3"}],
  action:"chooseGuild",
  updateState:x,
  playerName:"player name",
  gameName:"game name"
};

export const test4 = Template.bind({});
test4.args = {
  isWaiting: false,
  options:["TABLET", "GEAR", "COMPASS"],
  action:"chooseScience",
  updateState:x,
  playerName:"player name",
  gameName:"game name"
};
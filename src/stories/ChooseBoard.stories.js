import React from 'react';

import  ChooseBoard  from '../js/components/ChooseBoard';

export default {
  title: 'ChooseBoard',
  component: ChooseBoard
};

const Template = (args) => <ChooseBoard {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
  boardUses:{"Ephesus":false,"Rhodes":true,"Giza":false,"Halikarnassos":true,"Olympia":true,"Alexandria":false,"Babylon":false},
  currentBoard:"Olympia",
  currentSide:"B"  
};

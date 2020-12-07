import React from 'react';

import  DefineGame  from '../js/components/DefineGame';

export default {
  title: 'DefineGame',
  component: DefineGame
};

const Template = (args) => <DefineGame {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
  playerName:"player name",
  gameName:"game name"
};


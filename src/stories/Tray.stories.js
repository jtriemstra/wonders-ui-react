import React from 'react';

import  Tray  from '../js/components/Tray';

export default {
  title: 'Tray',
  component: Tray
};

const Template = (args) => <Tray {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
  coins:3,
  allVictories:{
    "1":[1,1],
    "2":[3]
  },
  allDefeats:2
};

export const test2 = Template.bind({});
test2.args = {
  coins:13,
  victories:0,
  allDefeats:0
};
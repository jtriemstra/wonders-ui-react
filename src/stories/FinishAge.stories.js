import React from 'react';

import  FinishAge  from '../js/components/FinishAge';

export default {
  title: 'FinishAge',
  component: FinishAge
};

const Template = (args) => <FinishAge {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
  victories:1,
  defeats:1,
  age:2
};

export const test2 = Template.bind({});
test2.args = {
  victories:2,
  defeats:0,
  age:1,
  allDefeats:0,
  allVictories:{"1":[1,1]}
};

export const test3 = Template.bind({});
test3.args = {
  victories:2,
  defeats:0,
  age:2,
  allDefeats:1,
  allVictories:{"2":[3,3]}
};

export const test4 = Template.bind({});
test4.args = {
  victories:2,
  defeats:0,
  age:2,
  allDefeats:1,
  allVictories:{"2":[3,3]},
  allVictoryPoints:{"ARMY":3,"COINS":4}
};

export const test5 = Template.bind({});
test5.args = {
  victories:2,
  defeats:0,
  age:2,
  allDefeats:1,
  allVictories:{"2":[3,3]},
  allVictoryPoints:{"COMMERCE":0,"STAGES":0,"GUILD":0,"ARMY":-4,"SCIENCE":10,"VICTORY":23,"COIN":1}
};
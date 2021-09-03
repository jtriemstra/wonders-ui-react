import React from 'react';

import  Hand  from '../js/components/Hand';

export default {
  title: 'Hand',
  component: Hand
};

const Template = (args) => <Hand {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
  cards:[{"status":"OK","card":{"name":"Clay Pit","type":"resource"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"East Trading Post","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Marketplace","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Theater","type":"victory"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Clay Pool","type":"resource"},"cost":0,"leftCost":0,"rightCost":0},{"status":"ERR_RESOURCE","card":{"name":"Barracks","type":"army"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Lumber Yard","type":"resource"},"cost":0,"leftCost":0,"rightCost":0}],
  canBuild:true,
  actions:"play;discard;build",
  currentAge:1
};

export const test2 = Template.bind({});
test2.args = {
  cards:[{"status":"OK","card":{"name":"Clay Pit","type":"resource"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"East Trading Post","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Marketplace","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Theater","type":"victory"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Clay Pool","type":"resource"},"cost":0,"leftCost":0,"rightCost":0},{"status":"ERR_RESOURCE","card":{"name":"Barracks","type":"army"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Lumber Yard","type":"resource"},"cost":0,"leftCost":0,"rightCost":0}],
  canBuild:true,
  actions:"play;discard;build",
  currentAge:2
};

export const test3 = Template.bind({});
test3.args = {
  cards:[{"status":"OK","card":{"name":"Clay Pit","type":"resource"},"cost":0,"leftCost":0,"rightCost":0, "costOptions":[]},{"status":"OK","card":{"name":"East Trading Post","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0, "costOptions":[{"left":1,"right":0},{"left":0,"right":2}]},{"status":"OK","card":{"name":"Marketplace","type":"commerce"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Theater","type":"victory"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Clay Pool","type":"resource"},"cost":0,"leftCost":0,"rightCost":0},{"status":"ERR_RESOURCE","card":{"name":"Barracks","type":"army"},"cost":0,"leftCost":0,"rightCost":0},{"status":"OK","card":{"name":"Lumber Yard","type":"resource"},"cost":0,"leftCost":0,"rightCost":0}],
  canBuild:true,
  actions:"play;discard;build",
  currentAge:2
};
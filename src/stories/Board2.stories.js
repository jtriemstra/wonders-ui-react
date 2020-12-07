import React from 'react';

import  Board2  from '../js/components/Board2';

export default {
  title: 'Board2',
  component: Board2
};

const Template = (args) => <Board2 {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
  cards:[{"name":"Marketplace","type":"commerce"},{"name":"Altar","type":"victory"},{"name":"Lumber Yard","type":"resource"},{"name":"Workshop","science":{"scienceOptions":["GEAR"]},"type":"science"},{"name":"Apothecary","science":{"scienceOptions":["COMPASS"]},"type":"science"}],
    buildState:[1,2,0],
    boardSide:"B",
    board:"Olympia",
    
};

export const test2 = Template.bind({});
test2.args = {
  cards:[{"name":"Marketplace","type":"commerce"},{"name":"Altar","type":"victory"},{"name":"Lumber Yard","type":"resource"},{"name":"Lumber Yard","type":"resource"},{"name":"Lumber Yard","type":"resource"},{"name":"Lumber Yard","type":"resource"},{"name":"Lumber Yard","type":"resource"},{"name":"Workshop","science":{"scienceOptions":["GEAR"]},"type":"science"},{"name":"Apothecary","science":{"scienceOptions":["COMPASS"]},"type":"science"}],
    buildState:[1,2,0],
    boardSide:"B",
    board:"Olympia",
    
};
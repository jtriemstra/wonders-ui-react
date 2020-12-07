import React from 'react';

import  Board  from '../js/components/Board';

export default {
  title: 'Board',
  component: Board
};

const Template = (args) => <Board {...args} />;

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

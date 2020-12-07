import React from 'react';

import  Waiting  from '../js/components/Waiting';

export default {
  title: 'Waiting',
  component: Waiting
};

const Template = (args) => <Waiting {...args} />;

export const test1 = Template.bind({});
test1.args = {
  isWaiting: true,
  waitFor: "START"
};



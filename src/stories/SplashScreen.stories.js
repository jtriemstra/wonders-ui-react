import React from 'react';

import  SplashScreen  from '../js/components/SplashScreen';

export default {
  title: 'SplashScreen',
  component: SplashScreen
};

const Template = (args) => <SplashScreen {...args} />;

const x = function(){
  alert("test");
}

export const test1 = Template.bind({});
test1.args = {
};


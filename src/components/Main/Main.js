import React from 'react';
import FormLeft from '../FormLeft/FormLeft';
import FormRightUse from '../FormRightUse/FormRIghtUse';
import './Main.scss';

const Main = () => {
  return (
    <div className="main">
      <FormLeft />
      <FormRightUse />
    </div>
  );
}

export default Main;

import React from 'react';
import './FormLeft.scss';
import MainRocket from "./img/mainRocket.png";
import Rocket from "./img/rocket.png";

const FormLeft = () => {
  return (
    <div className="form_left">
      <div className="top">
        Plan your activities and control your
      <br />
      proggress online
      </div>
      <div className="bottom_main">
        <div className="bottom_rocket">
          <img alt="rocket" src={Rocket} />
        </div>
        <div className="cloud">
          <div className="cloud_anime">
            <img alt="mainRocket" src={MainRocket} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormLeft;

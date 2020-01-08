import React from 'react';
import { animated } from 'react-spring';

import "./Scrollbar.scss";

const Scrollbar = ({ right, springX }) => (
  <div className="scroll">
    <div className="scrollbar">
      <div className="scrollbar__inner">
        <animated.div style={{ left: springX.interpolate(springX => `${springX / -right.current * 100}%`) }}></animated.div>
      </div>
    </div>
  </div>
);

export default Scrollbar;

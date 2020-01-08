import React from 'react';

import Brightness2RoundedIcon from '@material-ui/icons/Brightness2Rounded';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';

const ThemeBtn = ({ darkmode, set }) => (
  <button 
    className={`${darkmode ? "darkmodeBtn sun" : "darkmodeBtn moon"}`} 
    onClick={() => set(s => !s)}
  >
    {darkmode ? 
      <>
        <span className="sun">
          <WbSunnyRoundedIcon />
        </span>
        Light
      </>
      :
      <>
        <span className="moon">
          <Brightness2RoundedIcon />
        </span>
        Dark
      </>
    }
  </button>
)
export default ThemeBtn;
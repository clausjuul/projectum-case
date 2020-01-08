import React from 'react';

import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';

import './EndRowView.scss';

const ConfigSection = () => <ChevronLeftRoundedIcon />;

const EndRowView = ({ data, scrollRight, showScroll }) => (
  <ul className="end-row">
    <li className={showScroll ? "end-row__header--edit arrow" : "end-row__header--edit arrow disabled"}>
      <ChevronRightRoundedIcon onClick={scrollRight} />
    </li>
    {data.data[0].data.map((data, i) => {
      const isGroup = data.isGroup ? " isGroup" : "";
      const isLast = data.isLast ? " isLast" : "";
      const isTotal = i === 0 ? "end-row__total--edit" : "end-row__item--edit";

      return (
        <li key={i} className={`${isTotal}${isGroup}${isLast}`}>
          {data.isGroup && i !== 0 && <ConfigSection />}
        </li>
      )
    })}
  </ul>
);

export default EndRowView;

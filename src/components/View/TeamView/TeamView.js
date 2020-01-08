import React from 'react';

import './TeamView.scss';

const TeamView = ({ data }) => {
  return (
    data.header.map((item, i) => {
      const isGroup = item.isGroup ? " isGroup" : "";
      const isLast = item.isLast ? " isLast" : "";
      const clas = i === 0 ? "team__total" : "team__item";
      const initials = item.name.split(" ");
      return (
        <li 
          key={item.name + i}
          className={`${clas + isGroup + isLast}`}
          data-row={item.row}
        >
          { item.name }
          {!item.isGroup && i !== 0 &&
            <span 
              className="team__item__icon" 
              style={{background: item.color, boxShadow: `0 1px 4px -2px ${item.color}`}}
            >
              {initials[0][0] + initials[initials.length - 1][0]}
            </span>
          }
        </li>
      )
    })
  );
}

export default TeamView;

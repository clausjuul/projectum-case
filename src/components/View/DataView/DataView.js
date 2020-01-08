import React, { useState } from 'react';
import { animated } from 'react-spring';

import './DataView.scss';

const EditCell = ({ value, editMode }) => {
  const [state] = useState(value);
  const [newState, setNewState] = useState(null);

  const handleChange = (event) => {
    event.persist();
    setNewState(event.target.value);
  };

  return (
    <>
      { editMode ? 
        <input className="editInput" onChange={event => handleChange(event)} value={newState ? newState : state} />
      :
      newState ? newState : state
      }
    </>
  )
}
const Cell = ({ data, index, editMode }) => {
  const isGroup = data.isGroup ? " isGroup" : "";
  const isLast = data.isLast ? " isLast" : "";
  const isTotal = index === 0 ? "data__row__total" : "data__row__item";
  const color = editMode ? "" : (isGroup || index === 0) ? (data.r > data.a) ? ' red' : (data.r === data.a ? ' green' : ' yellow') : "";
  return (
    <td 
      data-row={data.row} 
      className={`${isTotal + isGroup + isLast + color}`}
    >
      <span className="data-cell">
        <EditCell value={data.r} editMode={editMode} />
      </span>
      <span className="data-cell">
        <EditCell value={data.a} editMode={editMode} />
      </span>
    </td>
  )
}

const DataView = ({ data, cellWidth, springX, editMode, setEditMode }) => {
  return (
    cellWidth !== 0 && <animated.tbody className="data" style={{ transform: springX.interpolate(x => `translate3d(${x}px,0,0)`) }}>
      {data.data.map((d, i) => (
        <tr 
          key={i} 
          className="data__row" 
          style={{width: `${cellWidth}px`}}
        >
          <td data-row={d.row} className="data__row__header">
            <span className="data__row__header--week">
              Uge { d.week }
            </span>
            <span className="data__row__header--date">
              { d.month } { d.year }
            </span>
            <div className="data__row__header--r-a">
              <span>R</span>
              <span>A</span>
            </div>
          </td>
          {d.data.map((data, i) => {
            return (
              <Cell key={i} index={i} data={data} editMode={editMode} />
            )
          })}
        </tr>
      ))}
    </animated.tbody>
  );
}

export default DataView;

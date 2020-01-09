import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { useSpring } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import useMeasure from 'react-use-measure';
import clamp from 'lodash.clamp'

import ThemeBtn from './ThemeBtn';
import Controls from '../Controls/Controls';
import Scrollbar from '../Scrollbar/Scrollbar';
import Form from '../Form/form';
import Modal from '../Modal/Modal';
import TeamView from './TeamView/TeamView';
import DataView from './DataView/DataView';
import EndRowView from './EndRowView/EndRowView';
import Context from '../Context/Context';
import './View.scss';

import Logo from '../../logo.png';

const findClosest = (value = 0, counts = [0]) => {
  return counts.reduce(function(prev, curr) {
    return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev)
  })
}

const View = ({ data }) => {
  const {darkmode, setDarkmode} = useContext(Context);
  const [ref, bounds] = useMeasure();

  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  const [cellWidth, setCellWidth] = useState(0);
  const scrollSnapPoints = useRef(null);
  const maxClamp = useRef(null);
 
  useLayoutEffect(() => {
  // useEffect(() => {
    // 160 = minCellWidth
    let x = bounds.width / 160;
    let cellW = bounds.width / Math.trunc(x);
    setCellWidth(cellW);
    maxClamp.current = cellW * (data.data.length - Math.trunc(x))
  }, [bounds.width, data])
  
  useLayoutEffect(() => {
    setShowScroll(bounds.width <= data.data.length * cellWidth ? true : false);
  }, [bounds.width, cellWidth, data])
  
  useEffect(() => {
    // Calc & sets snap point in array
    let newSnapPoints = [];
    data.data.forEach((_, i) => newSnapPoints.push(i * cellWidth));
    scrollSnapPoints.current = newSnapPoints;
  }, [cellWidth, data]);

  const [{ springX }, set] = useSpring(() => ({ springX: 0 }));

  const bind = useGesture({
    onDrag: ({ down, movement: [mx], memo = springX.getValue() }) => {
      if(down) set({ springX: clamp( memo + mx, -maxClamp.current, 0 )})
      else {
        let close = findClosest(-memo + -mx, scrollSnapPoints.current)
        set({ springX: clamp( -close, -maxClamp.current, 0 )})
      }
      return memo
    },
    onWheel: ({ memo = springX.getValue(), movement: [,my] }) => {
      set({ springX: clamp( memo + -my, -maxClamp.current, 0)})
      return memo
    }
  }, { dragDelay: true });

  // const addNewRow = useCallback(values => {
  //   const newData = [...data, {week: values.week, month: values.month, year: values.year, data: []}];
  //   setData(newData);
  // }, [data, setData]);

    return (
    <>
      <ThemeBtn darkmode={darkmode} set={setDarkmode} />
      <img className="projectum" src={Logo} alt="projectum-logo" />
      <section className="view">
        <div className="topbar">
          <h1 className="site-title">
            Oversigt
          </h1>
          {showScroll && 
            <Scrollbar 
              springX={springX} 
              right={maxClamp} 
            />
          }
        </div>

        <div className="container">
          <ul {...bind()} className="team">
            <li className="team__header">
              <Controls
                editMode={editMode}
                setEditMode={setEditMode}
                showScroll={showScroll} 
                scrollLeft={() => set({ springX: clamp((springX.getValue() + cellWidth), -maxClamp.current, 0)})}
                setShowModal={() => setShowModal(!showModal)}
              />
            </li>
            <TeamView
              data={data} 
              showScroll={showScroll}
              editMode={editMode}
              setEditMode={setEditMode}
              scrollLeft={() => set({ springX: clamp((springX.getValue() + cellWidth), -maxClamp.current, 0)})}
            />
          </ul>
          <table {...bind()} ref={ref} className="data-wrapper">
            <DataView 
              data={data} 
              cellWidth={cellWidth} 
              springX={springX}
              editMode={editMode}
            />
          </table>
          <ul {...bind()} className="end-row">
            <EndRowView
              data={data} 
              showScroll={showScroll}
              scrollRight={() => set({ springX: clamp((springX.getValue() - cellWidth), -maxClamp.current, 0)})} 
            />
          </ul>
        </div>
      </section>

      <Modal show={showModal} setShow={setShowModal}>
        <Form setShowModal={setShowModal} />
      </Modal>
    </>
  );
}

export default View;
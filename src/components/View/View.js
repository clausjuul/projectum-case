import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { useSpring } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer'
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

// import Logo from '../../logo.png';

const findClosest = (value = 0, counts = [0]) => {
  return counts.reduce(function(prev, curr) {
    return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev)
  })
}

const View = ({ data }) => {
  const {darkmode, setDarkmode} = useContext(Context);
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  const [cellWidth, setCellWidth] = useState(0);
  const scrollSnapPoints = useRef(null);
  const maxClamp = useRef(null);
  const numberOfCells = useRef(null);
  const cellIndex = useRef(0);
  const clampCellIndex = useRef(0);
  const minCellWidth = 160;

  useLayoutEffect(() => {
    let x = Math.trunc(bounds.width / minCellWidth);
    let cellW = bounds.width / x;
    setCellWidth(cellW);
    numberOfCells.current = x;
    maxClamp.current = cellW * (data.data.length - x);
    clampCellIndex.current = data.data.length - x;
  }, [bounds.width, data])
  
  useLayoutEffect(() => {
    setShowScroll(bounds.width <= data.data.length * cellWidth ? true : false);
  }, [bounds.width, cellWidth, data])
  
  useEffect(() => {
    let newSnapPoints = [];
    data.data.forEach((_, i) => newSnapPoints.push(i * cellWidth));
    scrollSnapPoints.current = newSnapPoints;
  }, [cellWidth, data]);

  const [{ springX }, set] = useSpring(() => ({ springX: 0 }));

  const bind = useGesture({
    onDrag: ({ down, movement: [mx], memo = springX.getValue() }) => {
      if(down) set({ springX: clamp( memo + mx, -maxClamp.current, 0 )})
      else {
        let newIndex = findClosest(-memo + -mx, scrollSnapPoints.current) / cellWidth
        let newIndexClamped = clamp(-newIndex, -clampCellIndex.current, 0)
        cellIndex.current = newIndexClamped
        set({ springX: newIndexClamped * cellWidth})
      }
      return Math.round(memo)
    },

    onWheel: ({ active, memo = springX.getValue(), movement: [,my] }) => {
      if(active) set({ springX: clamp( memo + -my, -maxClamp.current, 0 )})
      else {
        let newIndex = findClosest(-memo + my, scrollSnapPoints.current) / cellWidth;
        let newIndexClamped = clamp(-newIndex, -clampCellIndex.current, 0);
        cellIndex.current = newIndexClamped;
        set({ springX: newIndexClamped * cellWidth})
      }
      return Math.round(memo)
    }
  }, { dragDelay: true });

  const scrollLeft = left => {
    let newIndex = clamp(cellIndex.current + (left ? 1 : -1), -clampCellIndex.current, 0)
    cellIndex.current = newIndex
    set({ springX: newIndex * cellWidth})
  }

    return (
    <>
      <ThemeBtn darkmode={darkmode} set={setDarkmode} />
      {/* <img className="projectum" src={Logo} alt="projectum-logo" /> */}
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
                scrollLeft={() => scrollLeft(true)}
                setShowModal={() => setShowModal(!showModal)}
              />
            </li>
            <TeamView
              data={data} 
              showScroll={showScroll}
              editMode={editMode}
              setEditMode={setEditMode}
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
              scrollRight={() => scrollLeft(false)} 
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
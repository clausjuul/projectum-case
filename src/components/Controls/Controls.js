import React, { useState, Fragment } from 'react';
import { animated, useTransition, useSpring, config } from 'react-spring';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CakeRoundedIcon from '@material-ui/icons/CakeRounded';
import ChildFriendlyRoundedIcon from '@material-ui/icons/ChildFriendlyRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';

import Btn from './Btn';
import './Controls.scss';

const MenuItem = ({ item, index }) => {
  const spring = useSpring(
    { 
      delay: 75 * index + 100,
      opacity: 1,
      x: 0,
      from: { opacity: 0, x: 2 },
      config: config.stiff
    }
  )
  return (
    <li >
      <animated.button 
        onClick={item.onClick ? item.onClick : null}
        className="btn"
        style={{
          opacity: spring.opacity,
          transform: spring.x.interpolate(x => `translate3d(0,${x}px,0)`)
        }}
      >
        { item.icon }
        { item.label }
      </animated.button>
    </li>
  )
}

const Controls = ({ scrollLeft, showScroll, editMode, setEditMode, setShowModal }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const menuItems = [
    {label: 'Opret ny', icon: <AddRoundedIcon />, onClick: setShowModal },
    {label: 'Kage pause', icon: <CakeRoundedIcon />},
    {label: 'Kaos patruljen', icon: <ChildFriendlyRoundedIcon />},
    {label: 'Meget laaaaaaaangt menupunkt', icon: <EmojiPeopleRoundedIcon />}
  ];

  const menuTransition = useTransition(showMenu, null, {
    from: { opacity: 0, x: 10 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 5 },
    config: config.stiff
  });

  return (
    <section className="controls">
      <div className="control-buttons">
        <Btn 
          fromLabel={"Edit mode"}
          fromIcon={<EditRoundedIcon />}
          toLabel={"Gem ændringer"}
          toIcon={<DoneRoundedIcon />}
          toggle={editMode} 
          set={setEditMode} 
        />

        <Btn 
          fromLabel={"Menu"}
          fromIcon={<MenuRoundedIcon />}
          toLabel={"Close"}
          toIcon={<CloseRoundedIcon />}
          toggle={showMenu} 
          set={setShowMenu} 
        />
        {menuTransition.map(({ item, key, props }) => item && 
          <Fragment key={key}>
            <animated.ul 
              className="menu-container" 
              style={{
                opacity: props.opacity,
                transform: props.x.interpolate(x => `translate3d(0,${x}px,0)`)
              }}
            >
              {menuItems.map((item, i) => (
                <MenuItem key={i} item={item} index={i} show={showMenu} />
              ))}
            </animated.ul>
          </Fragment>
        )}
      </div>

      <div className={showScroll ? "arrow" : "arrow disabled"}>
        <ChevronLeftRoundedIcon onClick={scrollLeft} />
      </div>
    </section>
  )
}

export default Controls;
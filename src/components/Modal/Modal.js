import React, { Fragment } from "react";
import { useTransition, animated, config } from 'react-spring'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import "./Modal.scss";

const Modal = ({
  children,
  show,
  setShow,
  overlayOpacity = 0.7,
  overlayBgColor = "rgb(0, 0, 0)",
}) => {

  const transitions = useTransition(show, null, {
    from: { opacity: 0, y: 3, backdrop: 0 },
    enter: { opacity: 1, y: 0, backdrop: overlayOpacity},
    leave: { opacity: 0, y: 1, backdrop: 0 },
    config: config.stiff
  })

  return (
    transitions.map(({ item, key, props }) => item && <Fragment key={key}>
      <animated.div 
        className="modal"
        style={{ opacity: props.opacity }}
      >
        <animated.div 
          className="modal__inner" 
          style={{ transform: props.y.interpolate(y => `translateY(${y}rem)`) }}
        >
          <span
            className="modal__close"
            onClick={() => setShow(false)}
          >
            <CloseRoundedIcon />
          </span>
          { children }
        </animated.div>
      </animated.div>

        <animated.div
          className="backdrop"
          style={{ background: overlayBgColor, opacity: props.backdrop }}
          onClick={() => setShow(false)}
        />
    </Fragment>)
  );
};

export default Modal;

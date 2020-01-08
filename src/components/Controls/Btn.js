import React from 'react';
import { animated, useTransition, config } from 'react-spring';

const Btn = ({ toggle, set, toLabel, toIcon, fromLabel, fromIcon }) => {

  const btnTransition = useTransition(toggle, null, {
    from: { position: 'absolute', opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0 },
    config: config.stiff
  });

  return (
    <button className="btn" onClick={() => set(s => !s)}>
      {btnTransition.map(({ item, key, props }) => item ? 
        <animated.span key={key}
          style={{
            position: props.position,
            opacity: props.opacity,
            transform: props.y.interpolate(y => `translateY(${y}%)`)
          }}
        >
          { toIcon }
          { toLabel }
        </animated.span>
        :
        <animated.span key={key}
          style={{
            position: props.position,
            opacity: props.opacity,
            // transform: props.y.interpolate(y => `translateY(${y}%)`)
          }}
        >
          { fromIcon }
          { fromLabel }
        </animated.span>
      )}
    </button>
  )
}

export default Btn;
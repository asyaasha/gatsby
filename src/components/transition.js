import React, { useState } from 'react';
import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group';

const DURATION = 550;

const getTransitionStyle = (status, isBackward) => {
  const back = isBackward ? '30vw' : '-30vw';
  const front = isBackward ? '-30vw' : '30vw';

  const styles = {
    entering: {
      position: 'absolute',
      opacity: 0,
      marginLeft: front,
      marginRight: back,
    },
    entered: {
      opacity: 1,
      marginLeft: 0,
      marginRight: 0,
      transition: `opacity ${DURATION}ms ease-out, margin-left ${DURATION}ms ease-out, margin-right ${DURATION}ms ease-out`,
    },
    exiting: {
      opacity: 0,
      marginLeft: back,
      marginRight: front,
      transition: `opacity ${DURATION}ms ease-in, margin-left ${DURATION}ms ease-in, margin-right ${DURATION}ms ease-in`,
    },
  };
  return styles[status];
};

const triggerTransition = () => {
  window.CANVAS_BACKGROUND.triggerTransition(DURATION * 3);
};

const Transition = ({ location, children }) => {
  const [isBackward, setBackward] = useState(false);
  const [timeoutId, setTimeout] = useState(undefined);

  const startBack = () => {
    setBackward(true);
    window.CANVAS_BACKGROUND._transitionIsBackward = true;
  };
  const stopBack = () => {
    setBackward(false);
  };

  if (
    typeof window !== 'undefined' &&
    window.history &&
    window.history.pushState
  ) {
    window.addEventListener('popstate', startBack);
  }

  // Props
  const transactionProps = {
    key: location.pathname,
    timeout: {
      enter: DURATION,
      exit: DURATION,
    },
    onExited: stopBack,
    onExit: triggerTransition,
  };

  return (
    <TransitionGroup>
      <ReactTransition {...transactionProps}>
        {status => {
          return (
            <div
              style={{
                ...getTransitionStyle(status, stopBack),
              }}
              className="transition"
            >
              {children}
            </div>
          );
        }}
      </ReactTransition>
    </TransitionGroup>
  );
};

export default Transition;

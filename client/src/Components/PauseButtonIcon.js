import React from 'react';

import style from '../StyleSheets/PauseButtonIcon.module.css';

const PauseButtonIcon = ({ fill }) => {
  return (
    <svg 
        className={style.pause_button} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 448 512"
        style={{ transform: "rotate(90deg) scaleX(0.44) scaleY(.9)" }}
        fill={`${fill}`}>
        <path
            d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z"
            strokeWidth="15"
        />
    </svg>
  );
};

export default PauseButtonIcon;
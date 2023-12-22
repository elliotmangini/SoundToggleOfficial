import React from 'react';

import style from '../StyleSheets/SkipButtonIcon.module.css';

const SkipButtonIcon = ({ fill }) => {
  return (
    <svg 
        className={style.skip_button} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 550 550"
        // style={{ width: '500px', height: '300px' }}
        fill={`${fill}`}
    >
        <path
            d="M 52.5 440.6 c -9.5 7.9 -22.8 9.7 -34.1 4.4 S 0 428.4 0 416 V 96 C 0 83.6 7.2 72.3 18.4 67 s 24.5 -3.6 34.1 4.4 L 224 214.3 V 256 v 41.7 L 52.5 440.6 Z M 256 352 V 256 V 128 V 96 c 0 -12.4 7.2 -23.7 18.4 -29 s 24.5 -3.6 34.1 4.4 l 192 160 c 7.3 6.1 11.5 15.1 11.5 24.6 s -4.2 18.5 -11.5 24.6 l -192 160 c -9.5 7.9 -22.8 9.7 -34.1 4.4 s -18.4 -16.6 -18.4 -29 V 352 Z"
        />
    </svg>
  );
};

export default SkipButtonIcon;
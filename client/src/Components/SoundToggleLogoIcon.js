import React from 'react';

import style from '../StyleSheets/SoundToggleLogoIcon.module.css';

export default function SoundToggleLogoIcon ({ fill }) {
  return (
    <div>
        <svg
            className={style.player_logo}
            xmlns="http://www.w3.org/2000/svg"
            width="800" height="93" viewBox="0 0 800 93"
            fill={`white`}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M178.337 65H77.661c-34.644 0-62.828 28.356-62.828 63s28.185 63 62.828 63h100.676c34.645 0 62.83-28.356 62.83-63S212.981 65 178.337 65zM178.337 181H77.661c-29.13 0-52.828-23.87-52.828-53s23.698-53 52.828-53h100.676c29.131 0 52.83 23.87 52.83 53S207.468 181 178.337 181z" fill="#eef0f2" data-fill-palette-color="accent"></path><circle fill-rule="evenodd" clip-rule="evenodd" cx="177.13" cy="128" r="42" fill="#eef0f2" data-fill-palette-color="accent"></circle>
            <path d="M13.9 0.6L13.9 0.6Q10.8 0.6 7.53-0.53 4.25-1.65 1.6-4.05L1.6-4.05 6.5-9.95Q8.25-8.55 10.28-7.68 12.3-6.8 14.1-6.8L14.1-6.8Q16.05-6.8 16.93-7.4 17.8-8 17.8-9.1L17.8-9.1Q17.8-9.7 17.5-10.1 17.2-10.5 16.63-10.85 16.05-11.2 15.25-11.53 14.45-11.85 13.4-12.25L13.4-12.25 9.35-13.95Q8.05-14.45 6.85-15.28 5.65-16.1 4.75-17.23 3.85-18.35 3.33-19.8 2.8-21.25 2.8-23L2.8-23Q2.8-25.1 3.7-26.93 4.6-28.75 6.2-30.13 7.8-31.5 10.03-32.3 12.25-33.1 14.9-33.1L14.9-33.1Q17.7-33.1 20.58-32.05 23.45-31 25.7-28.75L25.7-28.75 21.4-23.35Q19.75-24.5 18.23-25.1 16.7-25.7 14.9-25.7L14.9-25.7Q13.3-25.7 12.4-25.15 11.5-24.6 11.5-23.5L11.5-23.5Q11.5-22.35 12.78-21.73 14.05-21.1 16.3-20.25L16.3-20.25 20.25-18.7Q23.3-17.5 24.95-15.35 26.6-13.2 26.6-9.8L26.6-9.8Q26.6-7.75 25.75-5.85 24.9-3.95 23.28-2.53 21.65-1.1 19.3-0.25 16.95 0.6 13.9 0.6ZM42.2 0.6L42.2 0.6Q39.8 0.6 37.55-0.28 35.3-1.15 33.57-2.83 31.85-4.5 30.82-6.95 29.8-9.4 29.8-12.5L29.8-12.5Q29.8-15.6 30.82-18.05 31.85-20.5 33.57-22.18 35.3-23.85 37.55-24.73 39.8-25.6 42.2-25.6L42.2-25.6Q44.6-25.6 46.82-24.73 49.05-23.85 50.77-22.18 52.5-20.5 53.55-18.05 54.6-15.6 54.6-12.5L54.6-12.5Q54.6-9.4 53.55-6.95 52.5-4.5 50.77-2.83 49.05-1.15 46.82-0.28 44.6 0.6 42.2 0.6ZM42.2-6.3L42.2-6.3Q44.15-6.3 44.97-7.98 45.8-9.65 45.8-12.5L45.8-12.5Q45.8-15.35 44.97-17.03 44.15-18.7 42.2-18.7L42.2-18.7Q40.25-18.7 39.42-17.03 38.6-15.35 38.6-12.5L38.6-12.5Q38.6-9.65 39.42-7.98 40.25-6.3 42.2-6.3ZM66.7 0.6L66.7 0.6Q64.65 0.6 63.17-0.13 61.7-0.85 60.75-2.18 59.8-3.5 59.35-5.38 58.9-7.25 58.9-9.6L58.9-9.6 58.9-25 67.5-25 67.5-10.7Q67.5-8.3 68.1-7.5 68.7-6.7 70-6.7L70-6.7Q71.2-6.7 71.97-7.2 72.75-7.7 73.6-8.9L73.6-8.9 73.6-25 82.2-25 82.2 0 75.2 0 74.6-3.3 74.4-3.3Q72.9-1.5 71.07-0.45 69.25 0.6 66.7 0.6ZM96.59 0L87.99 0 87.99-25 94.99-25 95.59-22 95.79-22Q97.29-23.45 99.22-24.53 101.14-25.6 103.69-25.6L103.69-25.6Q107.79-25.6 109.64-22.83 111.49-20.05 111.49-15.4L111.49-15.4 111.49 0 102.89 0 102.89-14.3Q102.89-16.7 102.29-17.5 101.69-18.3 100.39-18.3L100.39-18.3Q99.19-18.3 98.39-17.8 97.59-17.3 96.59-16.4L96.59-16.4 96.59 0ZM126.19 0.6L126.19 0.6Q123.84 0.6 121.97-0.3 120.09-1.2 118.77-2.9 117.44-4.6 116.72-7.03 115.99-9.45 115.99-12.5L115.99-12.5Q115.99-15.55 116.87-18 117.74-20.45 119.17-22.13 120.59-23.8 122.44-24.7 124.29-25.6 126.19-25.6L126.19-25.6Q128.24-25.6 129.54-24.93 130.84-24.25 131.99-23.1L131.99-23.1 131.69-26.7 131.69-34.8 140.29-34.8 140.29 0 133.29 0 132.69-2.3 132.49-2.3Q131.19-1 129.52-0.2 127.84 0.6 126.19 0.6ZM128.49-6.4L128.49-6.4Q129.49-6.4 130.24-6.78 130.99-7.15 131.69-8.2L131.69-8.2 131.69-17.4Q130.94-18.1 130.04-18.35 129.14-18.6 128.29-18.6L128.29-18.6Q126.94-18.6 125.87-17.25 124.79-15.9 124.79-12.6L124.79-12.6Q124.79-9.2 125.77-7.8 126.74-6.4 128.49-6.4ZM161.59 0L152.99 0 152.99-25.3 144.39-25.3 144.39-32.5 170.19-32.5 170.19-25.3 161.59-25.3 161.59 0ZM181.39 0.6L181.39 0.6Q178.99 0.6 176.74-0.28 174.49-1.15 172.76-2.83 171.04-4.5 170.01-6.95 168.99-9.4 168.99-12.5L168.99-12.5Q168.99-15.6 170.01-18.05 171.04-20.5 172.76-22.18 174.49-23.85 176.74-24.73 178.99-25.6 181.39-25.6L181.39-25.6Q183.79-25.6 186.01-24.73 188.24-23.85 189.96-22.18 191.69-20.5 192.74-18.05 193.79-15.6 193.79-12.5L193.79-12.5Q193.79-9.4 192.74-6.95 191.69-4.5 189.96-2.83 188.24-1.15 186.01-0.28 183.79 0.6 181.39 0.6ZM181.39-6.3L181.39-6.3Q183.34-6.3 184.16-7.98 184.99-9.65 184.99-12.5L184.99-12.5Q184.99-15.35 184.16-17.03 183.34-18.7 181.39-18.7L181.39-18.7Q179.44-18.7 178.61-17.03 177.79-15.35 177.79-12.5L177.79-12.5Q177.79-9.65 178.61-7.98 179.44-6.3 181.39-6.3ZM207.38 10.3L207.38 10.3Q205.23 10.3 203.33 9.98 201.43 9.65 200.01 8.9 198.58 8.15 197.73 6.98 196.88 5.8 196.88 4.1L196.88 4.1Q196.88 1.15 200.38-0.7L200.38-0.7 200.38-0.9Q199.38-1.6 198.73-2.6 198.08-3.6 198.08-5.2L198.08-5.2Q198.08-6.5 198.83-7.75 199.58-9 200.88-9.9L200.88-9.9 200.88-10.1Q199.53-11 198.51-12.65 197.48-14.3 197.48-16.5L197.48-16.5Q197.48-18.8 198.38-20.53 199.28-22.25 200.78-23.38 202.28-24.5 204.21-25.05 206.13-25.6 208.18-25.6L208.18-25.6Q210.38-25.6 212.18-25L212.18-25 221.48-25 221.48-18.8 217.88-18.8Q218.03-18.35 218.16-17.65 218.28-16.95 218.28-16.2L218.28-16.2Q218.28-14 217.48-12.43 216.68-10.85 215.33-9.85 213.98-8.85 212.13-8.38 210.28-7.9 208.18-7.9L208.18-7.9Q206.93-7.9 205.38-8.25L205.38-8.25Q204.98-7.9 204.88-7.63 204.78-7.35 204.78-6.8L204.78-6.8Q204.78-5.95 205.58-5.63 206.38-5.3 208.28-5.3L208.28-5.3 212.03-5.3Q216.73-5.3 219.31-3.78 221.88-2.25 221.88 1.2L221.88 1.2Q221.88 3.25 220.86 4.93 219.83 6.6 217.96 7.8 216.08 9 213.41 9.65 210.73 10.3 207.38 10.3ZM208.18-13L208.18-13Q209.38-13 210.13-13.85 210.88-14.7 210.88-16.5L210.88-16.5Q210.88-18.25 210.13-19.07 209.38-19.9 208.18-19.9L208.18-19.9Q206.98-19.9 206.23-19.07 205.48-18.25 205.48-16.5L205.48-16.5Q205.48-14.7 206.23-13.85 206.98-13 208.18-13ZM208.78 5L208.78 5Q210.88 5 212.28 4.38 213.68 3.75 213.68 2.7L213.68 2.7Q213.68 1.7 212.81 1.45 211.93 1.2 210.33 1.2L210.33 1.2 208.38 1.2Q206.88 1.2 206.11 1.13 205.33 1.05 204.78 0.9L204.78 0.9Q204.33 1.35 204.11 1.75 203.88 2.15 203.88 2.7L203.88 2.7Q203.88 3.9 205.23 4.45 206.58 5 208.78 5ZM234.68 10.3L234.68 10.3Q232.53 10.3 230.63 9.98 228.73 9.65 227.31 8.9 225.88 8.15 225.03 6.98 224.18 5.8 224.18 4.1L224.18 4.1Q224.18 1.15 227.68-0.7L227.68-0.7 227.68-0.9Q226.68-1.6 226.03-2.6 225.38-3.6 225.38-5.2L225.38-5.2Q225.38-6.5 226.13-7.75 226.88-9 228.18-9.9L228.18-9.9 228.18-10.1Q226.83-11 225.81-12.65 224.78-14.3 224.78-16.5L224.78-16.5Q224.78-18.8 225.68-20.53 226.58-22.25 228.08-23.38 229.58-24.5 231.51-25.05 233.43-25.6 235.48-25.6L235.48-25.6Q237.68-25.6 239.48-25L239.48-25 248.78-25 248.78-18.8 245.18-18.8Q245.33-18.35 245.46-17.65 245.58-16.95 245.58-16.2L245.58-16.2Q245.58-14 244.78-12.43 243.98-10.85 242.63-9.85 241.28-8.85 239.43-8.38 237.58-7.9 235.48-7.9L235.48-7.9Q234.23-7.9 232.68-8.25L232.68-8.25Q232.28-7.9 232.18-7.63 232.08-7.35 232.08-6.8L232.08-6.8Q232.08-5.95 232.88-5.63 233.68-5.3 235.58-5.3L235.58-5.3 239.33-5.3Q244.03-5.3 246.61-3.78 249.18-2.25 249.18 1.2L249.18 1.2Q249.18 3.25 248.16 4.93 247.13 6.6 245.26 7.8 243.38 9 240.71 9.65 238.03 10.3 234.68 10.3ZM235.48-13L235.48-13Q236.68-13 237.43-13.85 238.18-14.7 238.18-16.5L238.18-16.5Q238.18-18.25 237.43-19.07 236.68-19.9 235.48-19.9L235.48-19.9Q234.28-19.9 233.53-19.07 232.78-18.25 232.78-16.5L232.78-16.5Q232.78-14.7 233.53-13.85 234.28-13 235.48-13ZM236.08 5L236.08 5Q238.18 5 239.58 4.38 240.98 3.75 240.98 2.7L240.98 2.7Q240.98 1.7 240.11 1.45 239.23 1.2 237.63 1.2L237.63 1.2 235.68 1.2Q234.18 1.2 233.41 1.13 232.63 1.05 232.08 0.9L232.08 0.9Q231.63 1.35 231.41 1.75 231.18 2.15 231.18 2.7L231.18 2.7Q231.18 3.9 232.53 4.45 233.88 5 236.08 5ZM260.58 0.6L260.58 0.6Q258.38 0.6 256.9-0.08 255.43-0.75 254.53-2 253.63-3.25 253.25-4.98 252.88-6.7 252.88-8.8L252.88-8.8 252.88-34.8 261.48-34.8 261.48-8.5Q261.48-7.2 261.95-6.75 262.43-6.3 262.88-6.3L262.88-6.3Q263.13-6.3 263.3-6.3 263.48-6.3 263.78-6.4L263.78-6.4 264.78-0.1Q264.08 0.2 263.05 0.4 262.03 0.6 260.58 0.6ZM279.38 0.6L279.38 0.6Q276.63 0.6 274.28-0.28 271.93-1.15 270.2-2.83 268.48-4.5 267.48-6.95 266.48-9.4 266.48-12.5L266.48-12.5Q266.48-15.55 267.5-17.98 268.53-20.4 270.2-22.1 271.88-23.8 274.03-24.7 276.18-25.6 278.48-25.6L278.48-25.6Q281.23-25.6 283.28-24.65 285.33-23.7 286.68-22.05 288.03-20.4 288.7-18.2 289.38-16 289.38-13.5L289.38-13.5Q289.38-12.35 289.25-11.35 289.13-10.35 289.03-9.9L289.03-9.9 274.78-9.9Q275.38-7.65 276.93-6.78 278.48-5.9 280.58-5.9L280.58-5.9Q281.88-5.9 283.1-6.28 284.33-6.65 285.68-7.4L285.68-7.4 288.48-2.3Q286.43-0.85 283.95-0.13 281.48 0.6 279.38 0.6ZM274.68-15.5L274.68-15.5 282.08-15.5Q282.08-16.95 281.35-18.03 280.63-19.1 278.68-19.1L278.68-19.1Q277.23-19.1 276.15-18.25 275.08-17.4 274.68-15.5Z" opacity="1" transform="matrix(1,0,0,1,0,0)" fill="#eec643" class="wordmark-text-0" data-fill-palette-color="primary"></path>
        </svg>
    </div>
  );
};
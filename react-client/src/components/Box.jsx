import React from 'react';
import './Box.css';
import icon from '../images/intouch-icon-connect2.png';

const Box = () => (
  <div className="box">
    <div className="box-img">
      <img src={icon} alt="" height={'300%'}/>
    </div>
    <div className="box-text">
      <div>Some text</div>
      <div>Connect to other users</div>
    </div>
  </div>
);

export default Box;

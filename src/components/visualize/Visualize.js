import React from 'react';
import ReactDOM from 'react-dom';

const container = document.getElementById('root');

const Visualize = ({ visible, toggle }) => {
  return (

    visible ? ReactDOM.createPortal(
      <div className="visualize">
        <div className="visualize-pop">
          <h1>modal is here</h1>
          <button onClick={toggle}>wow1</button>
        </div>
        <div className="visualize-overlay"></div>
      </div>
      , container) : null
  )
}

export default Visualize;
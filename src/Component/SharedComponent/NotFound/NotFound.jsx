import React from "react";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="content">
        <canvas className="snow" id="snow"></canvas>
        <div className="main-text">
          <h1>
            Aw jeez.
            <br />
            That page has gone missing.
          </h1>
          <a className="home-link" href="#">
            Hitch a ride back home.
          </a>
        </div>
        <div className="ground">
          <div className="mound">
            <div className="mound_text">404</div>
            <div className="mound_spade"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

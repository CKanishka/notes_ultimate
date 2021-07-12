import React from "react";

const Footer = () => (
  <div
    className="container-fluid py-2 text-white"
    style={{ backgroundColor: "#76b4e0" }}
  >
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <div>Notes Ultimate</div>
        <div className="small">The ultimate note keeping app</div>
      </div>
      <div className="small text-secondary text-center">
        <div>
          Illustrations by{" "}
          <a href="https://www.opendoodles.com" title="OpenDoodles">
            Open Doodles
          </a>
        </div>
        <div>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
      <div> &copy;Copyright 2021 Notes Ultimate</div>
    </div>
  </div>
);

export default Footer;

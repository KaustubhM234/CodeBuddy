import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './draggable.css'; // Import your CSS file for custom styles

const ResizablePanels = () => {
  return (
    <div className="page-container">
      <div className="panel-container" id="content">
        <div className="panel-left">
          <div className="panel-container-vertical">
            <ResizableBox className="panel-top" width={300} height={150} axis="both">
              <h5 className="box-title">HTML</h5>
            </ResizableBox>
            <div className="splitter-horizontal"></div>
            <ResizableBox className="panel-bottom" width={300} height={150} axis="both">
              <h5 className="box-title">JS</h5>
            </ResizableBox>
            <div className="splitter-horizontal2"></div>
            <div className="panel-css">
              <h5 className="box-title">CSS</h5>
            </div>
          </div>
        </div>
        <div className="splitter"></div>
        <ResizableBox className="panel-right" width={400} height={300} axis="both">
          Result
        </ResizableBox>
      </div>
    </div>
  );
};

export default ResizablePanels;

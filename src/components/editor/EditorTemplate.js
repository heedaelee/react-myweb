import React, { Component } from 'react';
import './EditorTemplate.scss';

class EditorTemplate extends Component {
  state = {
    leftRatio:0.5
  };

  handleMouseMove = (ev) =>{
    this.setState({leftRatio: ev.clientX /window.innerWidth })
  }

  handleMouseUp = (ev) => {
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  handleDivdideMouseDown = (ev) =>{
    document.body.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { header, editor, preview } = this.props;
    const {leftRatio} = this.state;
    const {handleDivdideMouseDown} = this;
    const leftLand = {flex:leftRatio};
    const rightLand = {flex:1-leftRatio};
    const divideLnd = {left:`${leftRatio * 100}%`};
    
    return (
      <div className="editor-template">
        {header}
        <div className="panes">
          <div className="pane editor" style={leftLand}>
            {editor}
          </div>
          <div className="pane preview" style={rightLand}>
            {preview}
          </div>
          <div className="divide"
            style={divideLnd}
            onMouseDown={handleDivdideMouseDown}
          />
        </div>
      </div>
    );
  }
}

export default EditorTemplate;
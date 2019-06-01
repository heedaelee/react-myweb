import React from 'react';
import './EditorPreview.scss';

import { MarkdownRender } from 'components/common';

const EditorPreview = ({ title, markdown }) => (
  <div className="editor-preview">
    <h1 className="title">{title}</h1>
    <div>
      <MarkdownRender markdown={markdown} />
    </div>
  </div>
);

export default EditorPreview;
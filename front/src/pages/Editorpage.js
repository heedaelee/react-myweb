import React, { Component } from 'react';

import {
  EditorTemplate,
} from 'components/editor';

import EditorPaneContainer from 'containers/editor/EditorPaneContainer';
import EditorPreviewContainer from 'containers/editor/EditorPreviewContainer';

class Editorpage extends Component {
  render() {
    return (
      <EditorTemplate
        editor={<EditorPaneContainer />}
        preview={<EditorPreviewContainer />}
      >
      </EditorTemplate>
    );
  }
}

export default Editorpage;
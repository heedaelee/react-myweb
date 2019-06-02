import React, { Component } from 'react';

import {
  EditorTemplate,
} from 'components/editor';

import { Header } from "components/common";
import EditorPaneContainer from 'containers/editor/EditorPaneContainer';
import EditorPreviewContainer from 'containers/editor/EditorPreviewContainer';

class Editorpage extends Component {
  render() {
    return (
      <EditorTemplate
        header={<Header />}/* 차후에 컨테이너로 다 바꿔줘야.. */
        editor={<EditorPaneContainer />}
        preview={<EditorPreviewContainer />}
      />
    );
  }
}

export default Editorpage;
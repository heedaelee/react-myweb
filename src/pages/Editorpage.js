import React, { Component } from 'react';

import {
  EditorTemplate,
} from 'components/editor';

import { Header } from "components/common";
import EditorPane from 'components/editor/EditorPane';
import EditorPreview from 'components/editor/EditorPreview';

class Editorpage extends Component {
  render() {
    return (
      <EditorTemplate
        header={<Header />}
        editor={<EditorPane />}
        preview={<EditorPreview />}
      />
    );
  }
}

export default Editorpage;
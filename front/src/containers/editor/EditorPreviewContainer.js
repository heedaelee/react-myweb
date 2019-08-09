import React from 'react';
import { connect } from 'react-redux';

import { EditorPreview } from 'components/editor';

const EditorPreviewContainer = ({title, markdown }) =>{

  return(
    <EditorPreview 
      title = {title}
      markdown = {markdown}
    />
  );
}

export default connect(
(state) => ({
  title:state.editor.get('title'),
  markdown: state.editor.get('markdown')
}),
)(EditorPreviewContainer);
 
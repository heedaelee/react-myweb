import React, { Component } from 'react';
import './EditorPane.scss';

import CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

class EditorPane extends Component {
  editor = null;
  codeMirror = null;
  cursor = null;
  
  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true
    });
    this.codeMirror.on('change', this.handleChangeMarkdown);
  }

  componentDidMount() {
    this.initializeEditor();
  }

  handleChange = (e) => {
    const {onChangeInput} = this.props; //컨테이너 컴포넌트에서 차후에 props로 받아옴
    const {value,name} = e.target;
    console.log(name,value);
    onChangeInput({name,value});
    
    
  }

  handleChangeMarkdown = (body) => {
    console.log('mark',this.props);
    const {onChangeInput} =this.props;

    this.cursor = body.getCursor();
    onChangeInput({name:'markdown', value:body.getValue() });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.markdown !== this.props.markdown){
      const {codeMirror, cursor} =this;

      if(!codeMirror) return;
      codeMirror.setValue(this.props.markdown);

      if(!cursor) return;
      codeMirror.setCursor(cursor);
    }
  }

  render() {
    const {tags,title} = this.props;
    const {handleChange} = this;

    return (
      <div className="editor-pane">
        <input className="title" placeholder="제목 입력" name="title" 
          value={title} onChange={handleChange} 
        />
        <div className="code-editor" ref={ref => this.editor=ref}></div>
        <div className="tags">
          <div className="description">태그</div>
          <input 
            name="tags"
            placeholder="태그를 입력하세요(쉼표로 구분)"
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EditorPane;
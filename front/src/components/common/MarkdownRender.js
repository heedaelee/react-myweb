import React, { Component } from "react";
import "./MarkdownRender.scss";
import marked from "marked";
// PrismJS
import Prism from "prismjs";

import "../../../node_modules/prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-css.min.js";

class MarkdownRender extends Component {
  state = { html: "" };

  renderMarkdown = () => {
    const { markdown } = this.props;
    // 마크다운이 존재하지 않는다면 공백처리
    if (!markdown) {
      this.setState({ html: "" });
      return;
    }

    this.setState({
      html: marked(markdown, {
        breaks: true, // 일반 엔터로 새 줄 입력
        sanitize: true // 마크다운 내부 html 무시
      })
    });
  };

  constructor(props) {
    super(props);
    const { markdown } = props;
    //server-side-rendering땜에 일부러 DidMount()에 setState안하고 여기다..
    this.state = {
      html: markdown ? marked(markdown, { breaks: true, sanitize: true }) : ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // markdown 값이 변경되면 renderMarkdown을 호출합니다.
    if (prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown();
    }

    if (prevState.html !== this.state.html) {
      Prism.highlightAll();
    }
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const { html } = this.state;

    // React 에서 html 을 렌더링 하려면 객체를 만들어서 내부에
    // __html 값을 설정해야합니다.
    const markup = { __html: html };

    return <div className="markdown-render" dangerouslySetInnerHTML={markup} />;
  }
}

export default MarkdownRender;

import React from "react";
import styles from "./AskRemoveModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "components/modal/ModalWrapper";
import Button from "components/common/Button";

const cx = classNames.bind(styles);

const AskRemoveModal = ({ type, onConfirm, onCancel }) => {
  let visible = false;
  let msg = "";
  let title='';
  console.log('type.remove',type.remove)
  if (type.remove) {
    visible = type.remove;
    msg = "이 포스트를 정말 삭제하시겠습니까?";
    title='포스트 삭제'
  }
  if (type.unregister) {
    visible = type.unregister;
    msg = "정말 탈퇴하시겠습니까?";
    title='탈퇴'
  }

  return (
    <ModalWrapper visible={visible}>
      <div className={cx("question")}>
        <div className={cx("title")}>{title}</div>
        <div className={cx("description")}>{msg}</div>
      </div>
      <div className={cx("option")}>
        <Button theme="gray" onClick={onConfirm}>
          삭제
        </Button>
        <Button onClick={onCancel}>취소</Button>
      </div>
    </ModalWrapper>
  );
};

export default AskRemoveModal;

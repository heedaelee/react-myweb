import React from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "components/modal/ModalWrapper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

const cx = classNames.bind(styles);

const LoginModal = ({
  visible,
  password,
  error,
  onCancel,
  onLogin,
  onChange,
  onKeyPress
}) => (
  <ModalWrapper visible={visible}>
    <div className={cx("form")}>
      <div onClick={onCancel} className={cx("close")}>
        &times;
      </div>
      <div className={cx("title")}>로그인</div>
      <input
        autoFocus
        type="text"
        placeholder="이메일 입력*"
        /* value={email} */
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <input
        autoFocus
        type="password"
        placeholder="비밀번호 입력*"
        value={password}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <div className={cx("remember")}>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="아이디 저장"
        />
      </div>

      {error && <div className={cx("error")}>로그인 실패</div>}
      <div className={cx("login")} onClick={onLogin}>
        로그인
      </div>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            비밀번호 찾기
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            회원가입
          </Link>
        </Grid>
      </Grid>
    </div>
  </ModalWrapper>
);

export default LoginModal;

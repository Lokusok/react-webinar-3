import { useNavigate } from "react-router-dom";

import LoginStatus from "../../components/login-status";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function LoginInfo() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector((state) => ({
    token: state.user.auth.token,
    login: state.user.info.login,
  }));

  const callbacks = {
    onClickLogin: () => navigate('/login'),
    onClickExit: () => {
      store.actions.user.removeAuthFull();
      navigate('/login');
    },
  };

  const options = {
    isAuthorized: Boolean(select.token),
  };

  return (
    <LoginStatus
      username={select.login}
      onClickLogin={callbacks.onClickLogin}
      onClickExit={callbacks.onClickExit}
      isAuthorized={options.isAuthorized}
      t={t}
    />
  );
}

export default LoginInfo;
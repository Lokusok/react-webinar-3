import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import LoginInfo from "../../containers/login-info";

import LoginForm from "../../components/login-form";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector((state) => ({
    error: state.user.auth.error,
    token: state.user.auth.token,
  }));

  const callbacks = {
    onSubmit: (login, password) => {
      store.actions.user.authUser(login, password);
    },
  };

  useEffect(() => {
    store.actions.user.initAuth(false);
  }, []);

  useEffect(() => {
    if (select.token) {
      navigate('/profile', { replace: true });
    }
  }, [select.token]);

  return (
    <PageLayout head={<LoginInfo />}>
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation/>

      <LoginForm
        title={t('loginForm.title')}
        error={select.error}
        onSubmit={callbacks.onSubmit}
        t={t}
      />
    </PageLayout>
  )
}

export default Login;

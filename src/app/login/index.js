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

function Login() {
  const store = useStore();
  const navigate = useNavigate();

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
    store.actions.user.initAuth();
  }, []);

  useEffect(() => {
    if (select.token) {
      navigate('/profile');
    }
  }, [select.token]);

  return (
    <PageLayout head={<LoginInfo />}>
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation/>

      <LoginForm
        title='Вход'
        error={select.error}
        onSubmit={callbacks.onSubmit}
      />
    </PageLayout>
  )
}

export default Login;

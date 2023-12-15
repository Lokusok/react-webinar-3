import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import LoginInfo from "../../containers/login-info";

import ProfileInfo from "../../components/profile-info";

import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    token: state.session.auth.token,
    info: state.user.info,
    sessionWaiting: state.session.waiting,
    userId: state.session.auth.id,
  }));

  useEffect(() => {
    if (!select.token) {
      store.actions.session.initAuth();
    } else {
      store.actions.user.getInfoByToken(select.token);
    }
  }, [select.token]);

  useEffect(() => {
    if (!select.token && !select.sessionWaiting) {
      navigate('/login');
    }
  }, [select.token, select.sessionWaiting]);

  return (
    <PageLayout head={<LoginInfo />}>
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation/>

      <ProfileInfo
        title='Профиль'
        info={select.info}
      />
    </PageLayout>
  )
}

export default Profile;

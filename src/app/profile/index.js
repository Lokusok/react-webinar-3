import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";

import ProfileInfo from "../../components/profile-info";
import LoginInfo from "../../containers/login-info";

import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    token: state.user.auth.token,
    info: state.user.info,
    waiting: state.user.waiting,
  }));

  useEffect(() => {
    store.actions.user.initAuth();
  }, [select.token]);

  useEffect(() => {
    if (!select.token && !select.waiting) {
      navigate('/login');
    }
  }, [select.token, select.waiting]);

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

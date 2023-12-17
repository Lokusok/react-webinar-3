import { useEffect } from "react";

import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import LoginInfo from "../../containers/login-info";
import ProfileInfo from "../../components/profile-info";
import Spinner from "../../components/spinner";


import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

function Profile() {
  const store = useStore();
  const select = useSelector((state) => ({
    token: state.session.auth.token,
    info: state.user.info,
    waiting: state.user.waiting,
  }));

  useInit(() => {
    if (select.token) {
      store.actions.user.getInfoByToken(select.token);
    }
  }, [select.token]);

  useEffect(() => {
    return () => store.actions.user.reset();
  }, []);

  return (
    <PageLayout head={<LoginInfo />}>
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation/>

      <Spinner active={select.waiting}>
        <ProfileInfo
          title='Профиль'
          info={select.info}
        />
      </Spinner>
    </PageLayout>
  )
}

export default Profile;

import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";

import ProfileInfo from "../../components/profile-info";

function Profile() {
  return (
    <PageLayout>
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation/>

      <ProfileInfo />
    </PageLayout>
  )
}

export default Profile;

import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";

import LoginForm from "../../components/login-form";

function Login() {
  return (
    <PageLayout>
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation/>

      <LoginForm />
    </PageLayout>
  )
}

export default Login;

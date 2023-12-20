import {memo} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import ProfileCard from '../../components/profile-card';

function Profile({ translate }) {
  const store = useStore();

  useInit(() => {
    store.actions.profile.load();
  }, []);

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const {lang, setLang, t} = translate;

  return (
    <PageLayout>
      <TopHead t={t} />
      <Head title={t('title')}>
        <LocaleSelect lang={lang} setLang={setLang} t={t} />
      </Head>
      <Navigation t={t}/>
      <Spinner active={select.waiting}>
        <ProfileCard data={select.profile}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);

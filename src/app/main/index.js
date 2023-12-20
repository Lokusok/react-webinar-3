import {memo} from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';

function Main({ translate }) {

  const store = useStore();
  const {lang, setLang, t} = translate;

  useInit(async () => {
    await Promise.all([
      store.actions.catalog.initParams(),
      store.actions.categories.load()
    ]);
  }, [lang], true);

  return (
    <PageLayout>
      <TopHead t={t} />
      <Head title={t('title')}>
        <LocaleSelect lang={lang} setLang={setLang} t={t} />
      </Head>
      <Navigation t={t}/>
      <CatalogFilter t={t}/>
      <CatalogList t={t}/>
    </PageLayout>
  );
}

export default memo(Main);

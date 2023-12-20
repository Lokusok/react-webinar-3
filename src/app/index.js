import {Routes, Route} from 'react-router-dom';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Protected from '../containers/protected';
import {useSelector as useSelectorRedux} from 'react-redux';
import useTranslate from '../hooks/use-translate';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();
  useInit(async () => {
    await store.actions.session.remind();
  })

  const activeModal = useSelectorRedux(state => state.modals.name);
  const translate = useTranslate();

  return (
    <>
      <Routes>
        <Route path={''} element={<Main translate={translate} />}/>
        <Route path={'/articles/:id'} element={<Article translate={translate} />}/>
        <Route path={'/login'} element={<Login translate={translate} />}/>
        <Route path={'/profile'} element={<Protected redirect='/login'><Profile translate={translate} /></Protected>}/>
      </Routes>

      {activeModal === 'basket' && <Basket t={t}/>}
    </>
  );
}

export default App;

import {Routes, Route} from 'react-router-dom';

import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import AuthOnly from '../containers/auth-only';

import useStore from '../hooks/use-store';
import useSelector from "../hooks/use-selector";
import useInit from '../hooks/use-init';


/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const select = useSelector(state => ({
    activeModal: state.modals.name,
    token: state.session.auth.token,
  }));

  useInit(() => {
    if (!select.token) {
      store.actions.session.initAuth();
    }
  }, [select.token]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={(
          <AuthOnly>
            <Profile />
          </AuthOnly>
        )} />
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;

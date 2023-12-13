import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      isLoading: true,
      auth: {
        token: null,
        error: null,
      },
      info: {}
    };
  }

  /**
   * Установка токена
   * @param token
   */
  setLang(token) {
    this.setState({
      ...this.getState(),
      auth: {
        ...this.getState().auth,
        token,
      }
    }, 'Установлен токен');
  }

  async authUser(login, password) {
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password })
    });
    const json = await response.json();

    if (json.error) {
      this.setAuthError(json.error);
    } else if (json.result.token) {
      // this.setAuthToken(json.result.token);
      this.authUserByToken(json.result.token);
    }
  }

  async authUserByToken(token) {
    const response = await fetch('/api/v1/users/self?fields=*', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    });
    const json = await response.json();

    if (response.ok) {
      const { result } = json;
      // Валидный токен - в state и localStorage
      this.setAuthToken(token);

      this.setState({
        ...this.getState(),
        info: {
          login: result.username,
          email: result.email,
          name: result.profile.name,
          phone: result.profile.phone,
        }
      });
    } else if (json.error) {
      // Не валидный токен - удалить от всюду
      this.removeAuthFull();
    }
  }

  async initAuth(full = true) {
    // Во избежание дополнительных запросов
    // Запроса за пользователем с главной страницы не будет, если он авторизован
    if (!full && this.getState().auth.token) {
      return;
    }

    this.setState({ ...this.getState(), isLoading: true, });
    const token = window.localStorage.getItem('token');

    if (token) {
      await this.authUserByToken(token);
      this.setState({ ...this.getState(), isLoading: false, })
    }
  }

  setAuthError(error) {
    this.setState({
      ...this.getState(),
      auth: {
        ...this.getState().auth,
        error
      }
    });
  }

  setAuthToken(token) {
    this.setState({
      ...this.getState(),
      auth: {
        token: token,
        error: null,
      },
    });
    window.localStorage.setItem('token', token);
  }

  removeAuthFull() {
    this.reset();
    window.localStorage.removeItem('token');
  }

  reset() {
    this.setState({
      ...this.initState(),
    });
  }
}

export default UserState;

import StoreModule from "../module";

class SessionState extends StoreModule {
  initState() {
    return {
      waiting: true,
      auth: {
        id: null,
        token: null,
        error: null,
        login: null,
      },
    };
  }

  async authUserByData(login, password) {
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password })
    });
    const json = await response.json();

    // Ошибка авторизации - установка соединённых ошибок в стейт.
    if (json.error) {
      const errorMessage = json.error.data.issues.map((issue) => issue.message).join('\n');
      this.setAuthError(errorMessage);
    } else {
      // Валидный токен - в state и localStorage
      this.setAuthToken(json.result.token);
      this.setLogin(json.result.user.profile.name);
    }
  }

  async authByToken(token) {
    const response = await fetch('/api/v1/users/self?fields=_id,profile(name)', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    });
    const json = await response.json();

    if (response.ok) {
      const { result } = json;

      this.setAuthToken(token);

      this.setState({
        ...this.getState(),
        auth: {
          ...this.getState().auth,
          error: null,
          login: result.profile.name,
          id: result._id
        }
      });
    } else {
      // Не валидный токен - удалить от всюду
      this.removeAuthFull();
    }
  }

  async initAuth() {
    this.setWaiting(true);
    // Во избежание дополнительных запросов
    // Запроса за пользователем не будет, если он авторизован
    if (this.getState().auth.token) {
      return;
    }

    const token = window.localStorage.getItem('token');

    if (token) {
      await this.authByToken(token);
    }

    this.setWaiting(false);
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
        ...this.getState().auth,
        token: token,
        error: null,
      },
    });
    window.localStorage.setItem('token', token);
  }

  setLogin(login) {
    this.setState({
      ...this.getState(),
      auth: {
        ...this.getState().auth,
        login
      }
    })
  }

  setWaiting(isWaiting) {
    this.setState({
      ...this.getState(),
      waiting: isWaiting,
    });
  }

  removeAuthFull() {
    fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': this.getState().auth.token,
        'Content-Type': 'application/json',
      }
    });

    this.reset();
    window.localStorage.removeItem('token');
  }

  removeError() {
    this.setState({
      ...this.getState(),
      auth: {
        ...this.getState().auth,
        error: null,
      }
    });
  }

  reset() {
    this.setState({
      ...this.initState(),
    });
  }
}

export default SessionState;

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
      this.setAuthCorrect(json.result.token, login);
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
    const { result } = await response.json();
    this.setState({
      ...this.getState(),
      auth: {
        ...this.getState().auth,
        token,
      },
      info: {
        login: result.username,
        email: result.email,
        name: result.profile.name,
        phone: result.profile.phone,
      }
    });
  }

  async initAuth() {
    this.setState({ ...this.getState(), isLoading: true });
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

  setAuthCorrect(token, login) {
    this.setState({
      ...this.getState(),
      auth: {
        token: token,
        error: null,
      },
      info: {
        login: login,
      }
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

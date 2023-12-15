import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      waiting: false,
      info: {},
    };
  }

  async getInfoByToken(token) {
    this.setWaiting(true);

    const response = await fetch('/api/v1/users/self?fields=*', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    });
    const json = await response.json();

    if (response.ok) {
      const { result } = json;
      this.setInfo(result);
    }

    this.setWaiting(false);
  }

  setWaiting(isWaiting) {
    this.setState({
      ...this.getState(),
      waiting: isWaiting,
    });
  }

  setInfo(info) {
    this.setState({
      ...this.getState(),
      info: {
        login: info.profile.name,
        email: info.email,
        name: info.profile.name,
        phone: info.profile.phone,
      }
    });
  }

  reset() {
    this.setState({
      ...this.initState(),
    });
  }
}

export default UserState;

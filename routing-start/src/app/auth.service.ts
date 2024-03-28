export class AuthService {
  loggedIn = false;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  isAuthenticated() {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve(this.loggedIn), 500);
    });
    return promise;
  }
}

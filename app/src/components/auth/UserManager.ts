import { User } from './auth-types';

export class UserManager {
  private userKey = 'matdo:user';
  private localUser: User;

  constructor(private storage: Storage) {}

  get user() {
    return this.localUser;
  }

  get isSignedIn() {
    return !!this.localUser;
  }

  init(): User | null {
    // look in localstorage for and identity token
    const userStr = this.storage.getItem(this.userKey);

    if (!userStr) {
      return null;
    }

    this.localUser = JSON.parse(userStr);

    return this.localUser;
  }

  async signin(username: string, password: string): Promise<User> {
    if (this.isSignedIn) {
      return this.user;
    }

    this.localUser = { name: 'Jyn Erso', username, id: 'jyn-erson-id-uuid' };
    this.storage.setItem(this.userKey, JSON.stringify(this.localUser));
  }

  async logout(): Promise<void> {
    this.localUser = null;
    this.storage.removeItem(this.userKey);
  }
}

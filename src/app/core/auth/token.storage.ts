import { Injectable } from '@angular/core';

//const TOKEN_KEY = 'AuthToken';
const TOKEN_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY20iLCJzY29wZXMiOiJST0xFX0FETUlOIiwiaWF0IjoxNjc0NTc0NzM2LCJleHAiOjE2NzQ1OTI3MzZ9.5yvlvi3XdNxh7c_eY14tklThg63BubPmRTDZT0lO154';
const USERNAME = 'Username';
const CONNECTED_USER = 'ConnectedUser'; 

@Injectable()
export class TokenStorage {

  constructor() {}

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USERNAME);
    window.sessionStorage.removeItem(CONNECTED_USER);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(username);
    window.sessionStorage.setItem(USERNAME,  username);
  }

  public getUsername(): string | null  {
    return sessionStorage.getItem(USERNAME);
  }

  /*public saveConnectedUser(user: User) {
    window.sessionStorage.removeItem(CONNECTED_USER);
    window.sessionStorage.setItem(CONNECTED_USER,  JSON.stringify(user));
  }

  public getConnectedUser(): User {
    const user = JSON.parse(sessionStorage.getItem(CONNECTED_USER));
    return user;
  }*/

}

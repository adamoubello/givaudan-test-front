import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  
  private remoteUrl = environment.backend_url;

  constructor(private http: HttpClient) {}

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attempAuth ::');
      return this.http.post<any>(this.remoteUrl + 'token/generate-token', credentials);
  }

}

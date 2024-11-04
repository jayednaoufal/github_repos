import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl = 'https://api.github.com/search/repositories';
  private accessToken = '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';

  constructor(private http: HttpClient) {}

  getRepositories(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `token ${this.accessToken}`
    });

    const query = 'angular+language:typescript+stars:>=5000';
    return this.http.get(`${this.baseUrl}?q=${query}&sort=stars&order=desc&per_page=20`, {headers});
  }

  getUserDetails(username: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `token ${this.accessToken}`
    });

    return this.http.get(`https://api.github.com/users/${username}`, {headers});
  }
}

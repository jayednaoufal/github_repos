import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  getRepositories(): Observable<any> {
    const query = 'angular+language:typescript+stars:>=5000';
    return this.http.get(`${this.baseUrl}?q=${query}&sort=stars&order=desc&per_page=20`);
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}`);
  }
}

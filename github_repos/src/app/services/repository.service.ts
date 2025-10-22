import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Repository } from '../models/repository';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl = 'https://api.github.com/search/repositories';
  private accessToken = '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';

  constructor(private http: HttpClient) {}

  getRepositories(query: string): Observable<Repository[]> {
    const headers = new HttpHeaders({
      'Authorization': `token ${this.accessToken}`
    });

    return this.http.get<{ items: Repository[] }>(`${this.baseUrl}?q=${query}&sort=stars&order=desc&per_page=20`, { headers })
    .pipe(
      map(response => response.items.map((item: any) => ({
        id: item.id,
        html_url: item.html_url,
        full_name: item.full_name,
        name: item.name,
        description: item.description,
        owner: {
          id: item.owner.id,
          html_url: item.owner.html_url,
          login: item.owner.login,
          avatar_url: item.owner.avatar_url,
          public_repos: item.owner.public_repos
        } as Owner
      }) as Repository))
    );
  }

  getOwnerDetails(login: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `token ${this.accessToken}`
    });

    return this.http.get(`https://api.github.com/users/${login}`, {headers}).pipe(
      map((owner: any) => ({
        id: owner.id,
        html_url: owner.html_url,
        login: owner.login,
        avatar_url: owner.avatar_url,
        public_repos: owner.public_repos
      }) as Owner)
    );
  }
}

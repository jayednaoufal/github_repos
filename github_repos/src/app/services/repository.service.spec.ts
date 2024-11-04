import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RepositoryService } from './repository.service';
import { Owner } from '../models/owner';

describe('RepositoryService', () => {
  let service: RepositoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepositoryService]
    });

    service = TestBed.inject(RepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch repositories successfully and map response', () => {
    const mockResponse = {
      items: [
        { id: 1, html_url: 'https://github.com/owner1/repo1', full_name: 'owner1/repo1', name: 'Repo 1', description: 'Description 1', owner: { login: 'owner1' } },
        { id: 2, html_url: 'https://github.com/owner2/repo2', full_name: 'owner2/repo2', name: 'Repo 2', description: 'Description 2', owner: { login: 'owner2' } }
      ]
    };

    service.getRepositories('query').subscribe(repos => {
      expect(repos.length).toBe(2);
      expect(repos[0].name).toBe('Repo 1');
      expect(repos[1].owner.login).toBe('owner2');
    });

    const req = httpMock.expectOne(
      `https://api.github.com/search/repositories?q=query&sort=stars&order=desc&per_page=20`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch user details successfully', () => {
    const username = 'owner1';
    const mockUserResponse: Owner = { id: 1, html_url: 'https://github.com/owner1', login: 'owner1', avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4', public_repos: 10 };

    service.getOwnerDetails(username).subscribe(user => {
      expect(user.login).toBe('owner1');
      expect(user.public_repos).toBe(10);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
  });
});
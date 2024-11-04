import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RepositoryService } from './repository.service';

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

  it('should fetch repositories successfully', () => {
    const mockResponse = {
      items: [
        { id: 1, name: 'Angular Repo 1', owner: { login: 'owner1' } },
        { id: 2, name: 'Angular Repo 2', owner: { login: 'owner2' } }
      ]
    };

    service.getRepositories().subscribe(repos => {
      expect(repos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'https://api.github.com/search/repositories?q=angular+language:typescript+stars:>=5000&sort=stars&order=desc&per_page=20'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch user details successfully', () => {
    const username = 'owner1';
    const mockUserResponse = { login: 'owner1', public_repos: 10 };

    service.getUserDetails(username).subscribe(user => {
      expect(user).toEqual(mockUserResponse);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
  });
});

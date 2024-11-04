import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { RepositoryListComponent } from './list-repositories.component';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Repository } from '../../models/repository';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let mockRepositoryService: jasmine.SpyObj<RepositoryService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRepositoryService = jasmine.createSpyObj('RepositoryService', ['getRepositories']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, MatListModule, MatFormFieldModule, MatPaginatorModule],
      declarations: [RepositoryListComponent],
      providers: [
        { provide: RepositoryService, useValue: mockRepositoryService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch repositories on initialization', () => {
    const mockRepos: Repository[] = [
      { 
        id: 1, 
        html_url: 'https://github.com/owner/repo1', 
        full_name: 'owner/repo1', 
        name: 'Repo 1',
        description: 'A test repository',
        owner: {
          id: 1,
          html_url: 'https://github.com/owner',
          login: 'owner',
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
          public_repos: 42
        }
      }
    ];
    mockRepositoryService.getRepositories.and.returnValue(of(mockRepos));

    component.ngOnInit();

    expect(component.repositories.length).toBe(1);
    expect(component.repositories[0].full_name).toBe('owner/repo1');
  });

  it('should navigate to repository details on showDetails', () => {
    const repo: Repository = {
      id: 1,
      html_url: 'https://github.com/owner/repo1',
      full_name: 'owner/repo1',
      name: 'Repo 1',
      description: 'A test repository',
      owner: {
        id: 1,
        html_url: 'https://github.com/owner',
        login: 'owner',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        public_repos: 42
      }
    };

    component.showDetails(repo);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/repo', repo.full_name]);
  });

  it('should filter repositories based on search term', () => {
    const mockRepos: Repository[] = [
      { id: 1, html_url: '', full_name: 'owner/repo1', name: 'Repo 1', description: '', owner: { id: 1, html_url: '', login: '', avatar_url: '', public_repos: 0 } },
      { id: 2, html_url: '', full_name: 'owner/repo2', name: 'Repo 2', description: '', owner: { id: 2, html_url: '', login: '', avatar_url: '', public_repos: 0 } },
      { id: 3, html_url: '', full_name: 'owner/testrepo', name: 'Test Repo', description: '', owner: { id: 3, html_url: '', login: '', avatar_url: '', public_repos: 0 } }
    ];

    mockRepositoryService.getRepositories.and.returnValue(of(mockRepos));
    component.ngOnInit();

    component.searchTerm = 'Repo';
    component.filterRepositories();
    expect(component.filteredRepositories.length).toBe(3);

    component.searchTerm = 'test';
    component.filterRepositories();
    expect(component.filteredRepositories.length).toBe(1);

    component.searchTerm = 'nonexistent';
    component.filterRepositories();
    expect(component.filteredRepositories.length).toBe(0);
  });
});
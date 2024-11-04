import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryListComponent } from './list-repositories.component';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let mockRepositoryService: jasmine.SpyObj<RepositoryService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRepositoryService = jasmine.createSpyObj('RepositoryService', ['getRepositories']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, MatListModule, MatFormFieldModule],
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
    const mockRepos = { items: [{ full_name: 'owner/repo1', name: 'Repo 1' }] };
    mockRepositoryService.getRepositories.and.returnValue(of(mockRepos));

    component.ngOnInit();

    expect(component.repositories.length).toBe(1);
    expect(component.repositories[0].name).toBe('Repo 1');
  });

  it('should navigate to repository details on showDetails', () => {
    const repo = { full_name: 'owner/repo1', name: 'Repo 1' };

    component.showDetails(repo);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/repo', repo.full_name]);
  });

  it('should filter repositories based on search term', () => {
    const mockRepos = { items: [
      { full_name: 'owner/repo1', name: 'Repo 1' },
      { full_name: 'owner/repo2', name: 'Repo 2' },
      { full_name: 'owner/testrepo', name: 'Test Repo' }
    ]};

    mockRepositoryService.getRepositories.and.returnValue(of(mockRepos));
    component.ngOnInit();

    // Test filtering by a term
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
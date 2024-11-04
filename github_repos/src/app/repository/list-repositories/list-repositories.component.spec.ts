import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryListComponent } from './list-repositories.component';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material/list';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let mockRepositoryService: jasmine.SpyObj<RepositoryService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRepositoryService = jasmine.createSpyObj('RepositoryService', ['getRepositories']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatListModule],

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
});

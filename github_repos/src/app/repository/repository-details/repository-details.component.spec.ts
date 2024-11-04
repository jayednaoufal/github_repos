import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryDetailsComponent } from './repository-details.component';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RepositoryDetailsComponent', () => {
  let component: RepositoryDetailsComponent;
  let fixture: ComponentFixture<RepositoryDetailsComponent>;
  let mockRepositoryService: jasmine.SpyObj<RepositoryService>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    mockRepositoryService = jasmine.createSpyObj('RepositoryService', ['getRepositories', 'getUserDetails']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => 'owner/repo1'
        }
      }
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RepositoryDetailsComponent],
      providers: [
        { provide: RepositoryService, useValue: mockRepositoryService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch repository and owner details on initialization', () => {
    const mockRepo = {
      full_name: 'owner/repo1',
      name: 'Repo 1',
      owner: { login: 'owner' }
    };

    const mockUserDetails = { login: 'owner', public_repos: 10 };

    mockRepositoryService.getRepositories.and.returnValue(of({ items: [mockRepo] }));
    mockRepositoryService.getUserDetails.and.returnValue(of(mockUserDetails));

    component.ngOnInit();

    expect(component.repo).toEqual(mockRepo);
    expect(component.ownerDetails).toEqual(mockUserDetails);
  });
});

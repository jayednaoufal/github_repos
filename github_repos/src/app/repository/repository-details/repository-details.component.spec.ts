import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryDetailsComponent } from './repository-details.component';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Repository } from '../../models/repository';
import { Owner } from '../../models/owner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

describe('RepositoryDetailsComponent', () => {
  let component: RepositoryDetailsComponent;
  let fixture: ComponentFixture<RepositoryDetailsComponent>;
  let mockRepositoryService: jasmine.SpyObj<RepositoryService>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    mockRepositoryService = jasmine.createSpyObj('RepositoryService', ['getRepositories', 'getOwnerDetails']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? 'owner/repo1' : null)
        }
      }
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatDividerModule
      ],
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
    const mockRepo: Repository = {
      id: 1,
      html_url: 'https://github.com/owner/repo1',
      full_name: 'owner/repo1',
      name: 'repo1',
      description: 'A test repository',
      owner: {
        id: 1,
        html_url: 'https://github.com/owner',
        login: 'owner',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        public_repos: 10
      }
    };

    const mockUserDetails: Owner = {
      id: 1,
      html_url: 'https://github.com/owner',
      login: 'owner',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      public_repos: 10
    };

    mockRepositoryService.getRepositories.and.returnValue(of([mockRepo]));
    mockRepositoryService.getOwnerDetails.and.returnValue(of(mockUserDetails));

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockRepositoryService.getRepositories).toHaveBeenCalled();
    expect(mockRepositoryService.getOwnerDetails).toHaveBeenCalledWith('owner');
    expect(component.repo).toEqual(mockRepo);
    expect(component.ownerDetails).toEqual(mockUserDetails);
  });
});
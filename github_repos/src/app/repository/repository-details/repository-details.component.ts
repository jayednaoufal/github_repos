import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { Owner } from '../../models/owner';
import { Repository } from '../../models/repository';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.css']
})
export class RepositoryDetailsComponent implements OnInit {
  repo: Repository | null = null;
  ownerDetails: Owner | null = null;

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService
  ) {}

  ngOnInit(): void {
    const repoName = this.route.snapshot.paramMap.get('id');
    this.repositoryService.getRepositories('angular+language:typescript+stars:>=5000').subscribe((repositories: Repository[]) => {
      this.repo = repositories.find(repo => repo.full_name === repoName) || null;
  
      if (this.repo && this.repo.owner) {
        this.repositoryService.getOwnerDetails(this.repo.owner.login).subscribe((ownerDetails) => {
          this.ownerDetails = ownerDetails;
        });
      }
    });
  }
}

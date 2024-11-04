import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repository-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.css']
})
export class RepositoryDetailsComponent implements OnInit {
  repo: any;
  ownerDetails: any;

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService
  ) {}

  ngOnInit(): void {
    const repoName = this.route.snapshot.paramMap.get('id');
    this.repositoryService.getRepositories().subscribe(data => {
      this.repo = data.items.find((repository: any) => repository.full_name === repoName);

      if (this.repo) {
        this.repositoryService.getUserDetails(this.repo.owner.login).subscribe(data => {
          this.ownerDetails = data;
        });
      }
    });
  }
}

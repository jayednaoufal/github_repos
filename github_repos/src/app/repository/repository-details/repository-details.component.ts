import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-repository-details',
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

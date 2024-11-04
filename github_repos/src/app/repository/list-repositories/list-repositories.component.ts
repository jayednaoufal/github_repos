import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
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
  selector: 'app-repository-list',
  templateUrl: './list-repositories.component.html',
  styleUrls: ['./list-repositories.component.css']
})
export class RepositoryListComponent implements OnInit {
  repositories: any[] = [];

  constructor(private repositoryService: RepositoryService, private router: Router) {}

  ngOnInit(): void {
    this.repositoryService.getRepositories().subscribe(data => {
      this.repositories = data.items;
    });
  }

  showDetails(repo: any): void {
    this.router.navigate(['/repo', repo.full_name]);
  }
}

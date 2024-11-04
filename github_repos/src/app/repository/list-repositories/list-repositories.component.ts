import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';

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

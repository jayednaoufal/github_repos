import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Repository } from '../../models/repository';


@Component({
  selector: 'app-repository-list',
  templateUrl: './list-repositories.component.html',
  styleUrls: ['./list-repositories.component.css']
})
export class RepositoryListComponent implements OnInit {
  repositories: Repository[] = [];
  filteredRepositories: any[] = [];
  searchTerm: string = '';

  pageSize: number = 10;
  pageIndex: number = 0;

  @ViewChild('paginator') paginator: any;

  constructor(private repositoryService: RepositoryService, private router: Router) {}

  ngOnInit(): void {
    this.repositoryService.getRepositories('angular+language:typescript+stars:>=5000').subscribe(data => {
      this.repositories = data;
      this.filteredRepositories = this.repositories;
    });
  }

  filterRepositories(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRepositories = this.repositories.filter(repo =>
      repo.full_name.toLowerCase().includes(term)
    );

    this.pageIndex = 0;
  }

  showDetails(repo: any): void {
    this.router.navigate(['/repo', repo.full_name]);
  }


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  get paginatedRepositories(): any[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredRepositories.slice(startIndex, startIndex + this.pageSize);
  }
}
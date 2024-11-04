import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from '../services/repository.service';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryListComponent } from './list-repositories/list-repositories.component';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    RepositoryListComponent,
    RepositoryDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  providers : [
    RepositoryService
  ],
})
export class RepositoryModule { }

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations : [
    RepositoryDetailsComponent,
    RepositoryListComponent
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
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers : [
    RepositoryService
  ],
})
export class RepositoryModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from '../services/repository.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers : [
    RepositoryService
  ],
})
export class RepositoryModule { }

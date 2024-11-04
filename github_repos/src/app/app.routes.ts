import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoryListComponent } from './repository/list-repositories/list-repositories.component';
import { RepositoryDetailsComponent } from './repository/repository-details/repository-details.component';

export const routes: Routes = [
  { path: '', component: RepositoryListComponent },
  { path: 'repo/:id', component: RepositoryDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

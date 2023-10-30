import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralTableComponent } from './general-table/general-table.component';
import { ShortInfoComponent } from './short-info/short-info.component';

const routes: Routes = [
  {path: 'generalTable', component: GeneralTableComponent},
  {path: 'shortInfo', component: ShortInfoComponent},
  {path: '', redirectTo: 'generalTable', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

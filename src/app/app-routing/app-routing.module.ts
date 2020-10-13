import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent},
  { path: 'todo-list', component: TodoListComponent},
  // { path: 'app', component: NavComponent},
  // { path: 'history', component: HistoryNavComponent},
  // { path: 'account-info', component: AccountInfoComponent},
  // { path: 'request', component: RequestFormComponent},
  // { path: 'food-detail', component: FoodDetailComponent},
  // { path: 'our-sponsers', component: OurSponsersComponent},
  // { path: 'contact-us', component:  ContactUsComponent},
  // { path: 'user-location', component:  UserLocationComponent},
  // { path: 'test-function', component:  TestFunctionsComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

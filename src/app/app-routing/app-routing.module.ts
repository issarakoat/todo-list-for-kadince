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

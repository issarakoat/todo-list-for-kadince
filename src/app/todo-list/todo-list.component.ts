import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { TodoService } from '../services/todo.service';
import { UserService } from '../services/user.service';
import { Todo } from '../models/todo.model';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  searchStr = '';
  todos: Todo[] = [];
  isLogin = false;
  constructor(
    public dialog: MatDialog,
    private todoService: TodoService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.checkLogin().then(() => {
      this.userService.getUser().subscribe((user) => {
        this.isLogin = user ? true : false;
        if (user) {
          this.todoService.onFetchTodos().subscribe((ts) => {
            this.todos = ts;
          });
        }
        else {
          this.router.navigate(['/welcome']);
        }
      });
    });
  }
  openCreateTodoDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onUpdate() {}
  onDelete() {}
}

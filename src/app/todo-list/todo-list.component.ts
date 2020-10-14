import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateUpdateDialogComponent } from '../create-update-dialog/create-update-dialog.component';
import { TodoService } from '../services/todo.service';
import { UserService } from '../services/user.service';
import { Todo } from '../models/todo.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  searchStr = '';
  filterStr = 'all';
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
  openCreateTodoDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onUpdate(todo: Todo): void {
    console.log('onUpdate');
    this.todoService.onUpdateComplete(todo);
  }
  onDelete(id): void {
    console.log('onDelete');
    this.todoService.onDeleteTodo(id);
  }
  onEdit(todo: Todo): void{
    this.dialog.open(CreateUpdateDialogComponent, {
      data: todo.id
    });
  }
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}

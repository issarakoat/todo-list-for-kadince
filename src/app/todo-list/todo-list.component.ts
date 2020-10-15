import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateUpdateDialogComponent } from '../create-update-dialog/create-update-dialog.component';
import { TodoService } from '../services/todo.service';
import { UserService } from '../services/user.service';
import { Todo } from '../models/todo.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ShowTodoDetailDialogComponent } from '../show-todo-detail-dialog/show-todo-detail-dialog.component';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  searchStr = '';
  searchStrBox = '';
  filterStr = 'all';
  displayOptionStr = 'accending';
  todos: Todo[] = [];
  isLogin = false;

  displayedColumns: string[] = ['content', 'detail', 'completion', 'edit', 'delete'];
  dataSource = this.todos;
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

    dialogRef.afterClosed().subscribe(() => {
      console.log('dialog is closed');
    });
  }
  openShowDetailDialog(id): void {
    const dialogRef = this.dialog.open(ShowTodoDetailDialogComponent, {
      data: id
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onUpdate(todo: Todo): void {
    console.log('onUpdate');
    this.todoService.onUpdateComplete(todo);
  }
  onDelete(id): void {
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

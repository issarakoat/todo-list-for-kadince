import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateUpdateDialogComponent } from '../../components/create-update-dialog/create-update-dialog.component';
import { TodoService } from '../../services/todo.service';
import { UserService } from '../../services/user.service';
import { Todo } from '../../models/todo.model';
import { ShowTodoDetailDialogComponent } from '../../components/show-todo-detail-dialog/show-todo-detail-dialog.component';
import { ShowChartDialogComponent } from '../../components/show-chart-dialog/show-chart-dialog.component';

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
  isLoading = true;

  constructor(
    public dialog: MatDialog,
    private todoService: TodoService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.checkLogin().then(() => {
      this.userService.getUser().subscribe((user) => {
        this.isLogin = user ? true : false;
        if (user) {
          this.todoService.onFetchTodos().subscribe((ts) => {
            this.todos = ts;
            this.isLoading = false;
          });
        }
        else {
          this.router.navigate(['/welcome']);
        }
      });
    });
  }
  openCreateTodoDialog(): void {
    this.dialog.open(CreateUpdateDialogComponent);
  }
  openChartDialog(): void {
    this.dialog.open(ShowChartDialogComponent);
  }
  openShowDetailDialog(id): void {
    this.dialog.open(ShowTodoDetailDialogComponent, {
      data: id
    });
  }
  onUpdate(todo: Todo): void {
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
}

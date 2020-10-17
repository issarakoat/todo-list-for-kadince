import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-show-todo-detail-dialog',
  templateUrl: './show-todo-detail-dialog.component.html',
  styleUrls: ['./show-todo-detail-dialog.component.css']
})
export class ShowTodoDetailDialogComponent implements OnInit {
  // tslint:disable-next-line: new-parens
  date: Date = new Date;
  content = '';
  status = '';
  constructor(
    public dialogRef: MatDialogRef<ShowTodoDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todoService.onGetTodoById(this.data).subscribe(todo => {
      // tslint:disable-next-line: radix
      const date = new Date(parseInt(todo.created));
      this.date = date;
      this.content = todo.content;
      this.status = todo.completed === true ? 'Completed' : 'Uncomplete';
    });
  }

}

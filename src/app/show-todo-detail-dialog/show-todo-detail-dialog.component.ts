import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-show-todo-detail-dialog',
  templateUrl: './show-todo-detail-dialog.component.html',
  styleUrls: ['./show-todo-detail-dialog.component.css']
})
export class ShowTodoDetailDialogComponent implements OnInit {
  date: Date = new Date;
  content = '';
  constructor(
    public dialogRef: MatDialogRef<ShowTodoDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private todoService: TodoService
  ) {

  }

  ngOnInit(): void {
    console.log(this.data);
    this.todoService.onGetTodoById(this.data).subscribe(todo => {
      const date = new Date(parseInt(todo.created));
      this.date = date;
      this.content = todo.content;
    });
  }

}

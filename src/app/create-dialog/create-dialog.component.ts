import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css'],
})
export class CreateDialogComponent implements OnInit {
  @ViewChild('form', { static: false }) addTodoForm: NgForm;
  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onCreate(Form): void {
    console.log(Form.content);
    const todo: Todo = {
      content: Form.content,
      completed: false,
      created: new Date().getTime()
    };
    this.todoService.onCreateTodo(todo);
    this.addTodoForm.reset();
  }
  onFinishAdding(): void {
    this.dialogRef.close();
  }
}

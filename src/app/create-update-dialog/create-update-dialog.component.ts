import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.css'],
})

export class CreateUpdateDialogComponent implements OnInit {
  @ViewChild('form', { static: false }) addTodoForm: NgForm;
  isUpdate = false;
  currentTodo: Todo;
  constructor(
    public dialogRef: MatDialogRef<CreateUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    if (this.data){
      this.isUpdate = true;
      this.todoService.onGetTodoById(this.data).subscribe( v => {
        this.addTodoForm.form.patchValue({content: v.content});
        this.currentTodo = v;
        console.log(this.currentTodo);
      });
    }
  }
  onCreate(Form): void {
    const todo: Todo = {
      content: Form.content,
      completed: false,
      created: new Date().getTime()
    };
    this.todoService.onCreateTodo(todo).catch(err => {
      console.error(err);
    }).finally( () => {
      console.log('created');
    });
    this.addTodoForm.reset();
  }
  onFinishAdding(): void {
    this.dialogRef.close();
  }
  onEditItem(newContent): void{
    this.currentTodo.id = this.data;
    this.todoService.onEditTodoContent(this.currentTodo, newContent.content);
    this.dialogRef.close();
  }
}

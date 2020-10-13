import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.css'],
})
export class CreateUpdateDialogComponent implements OnInit {
  @ViewChild('form', { static: false }) addTodoForm: NgForm;
  constructor(
    public dialogRef: MatDialogRef<CreateUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onCreate(Form): void {
    console.log(Form.content);
    this.addTodoForm.reset();
  }
  onFinishAdding(): void {
    this.dialogRef.close();
  }
}

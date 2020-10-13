import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateUpdateDialogComponent } from '../create-update-dialog/create-update-dialog.component';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  searchStr = '';
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openCreateTodoDialog(){
    const dialogRef = this.dialog.open(CreateUpdateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

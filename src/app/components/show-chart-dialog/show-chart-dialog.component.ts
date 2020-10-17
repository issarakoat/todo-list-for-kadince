import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-show-chart-dialog',
  templateUrl: './show-chart-dialog.component.html',
  styleUrls: ['./show-chart-dialog.component.css']
})
export class ShowChartDialogComponent implements OnInit {

  title = 'Chart Showing Completion of Todo list';
  type = 'PieChart';
  data = [];
  dataLen = 0;
  columnNames = ['Completion', 'Percentage'];
  options = {
  };
  width = 550;
  height = 400;
  constructor(private todoService: TodoService) {
    this.todoService.onFetchTodos().subscribe( todos => {
      this.dataLen = todos.length;
      const completeNum = todos.filter( v => v.completed === true);
      const completPercentage = completeNum.length / todos.length * 100;
      const inCompletePercentage: number = 100 - completPercentage;
      this.data = [['Complete', completPercentage], ['Incomplete', inCompletePercentage]];
    });
   }

  ngOnInit(): void {

  }
}

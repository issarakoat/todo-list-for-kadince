import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTodos'
})
export class FilterTodosPipe implements PipeTransform {

  transform(value: any, filterString: string): any {
    if (filterString === 'all'){
      return value;
    }
    const completeArr = [];
    const pendingArr = [];
    for (const todo of value){
      if (todo.completed){
        completeArr.push(todo);
      }
      else{
        pendingArr.push(todo);
      }
    }
    if (filterString === 'completed'){
      return completeArr;
    }
    else if (filterString === 'pending'){
      return pendingArr;
    }
    return value;
  }

}

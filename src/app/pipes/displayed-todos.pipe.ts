import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayedTodos'
})
export class DisplayedTodosPipe implements PipeTransform {

  transform(value: any, option: string): any {
    if (option === 'accending'){
      return value.sort((a, b) => (a.created > b.created) ? 1 : -1);
    }
    return value.sort((a, b) => (a.created < b.created) ? 1 : -1);
  }

}

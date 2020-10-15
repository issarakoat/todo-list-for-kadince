import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearchBox'
})
export class FilterSearchBoxPipe implements PipeTransform {

  transform(value: any, searchStrBox: string, content: string): any {
    if (value.length === 0 || searchStrBox === '') {
      return value;
    }
    const resArr = [];
    for (const todo of value){
      if (todo[content].toLowerCase().includes(searchStrBox.toLocaleLowerCase())){
        resArr.push(todo);
      }
    }
    return resArr;
  }

}

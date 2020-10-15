import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string): any {
    let dots = '';
    if (value.length > 15){
      dots += ' ...';
    }
    return value.substring(0, 15) + dots;
  }

}

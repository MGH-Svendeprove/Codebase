import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, maxlength: number = 200, ellipsis: string = '...'): string {
    if(!value) {
      return '';
    }

    if(value.length <= maxlength) {
      console.log(value.length);
      return value;
    }

    return value.slice(0, maxlength) + ellipsis;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'sortByTitle'
})
  
export class SortByTitlePipe implements PipeTransform {

  transform(array: string[]): string[] {

    return array.sort((t1, t2) => (t1 > t2 ? 1 : -1) );
  }
}
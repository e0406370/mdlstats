import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../utility/models';

@Pipe({
  standalone: true,
  name: 'topFiveEntries'
})
  
export class TopFiveEntriesPipe implements PipeTransform {
  
  transform(sortedMap: Map<string, Person>): [string, Person][] {

    return Array.from(sortedMap.entries()).slice(0, 5);
  }
}
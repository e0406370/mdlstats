import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'mapEntries'
})
  
export class MapEntriesPipe implements PipeTransform {

  transform<K, V>(input: Map<K, V>): Array<any> {

    return Array.from(input).map(([key, value]) => ({ key, value }));
  }
}
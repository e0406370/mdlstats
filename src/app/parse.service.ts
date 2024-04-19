import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  
export class ParseService {

  // e.g. K : V => "Unnatural" (name) : "25422-unnatural" (id)
  completedDramasMap: Map<string, string> = new Map;

  // e.g. K : V => "Ishihara Satomi" (name) : 1 (count)
  personCountMap: Map<string, number> = new Map;

  retrieveCompletedDramas(res: any) {

    res.data.list.Completed.items.map(
      (drama: any) => {
        console.info(drama);
        this.completedDramasMap.set(drama.name, drama.id)
      }
    );
  }

  populatePersonCount(res: any) {

    res.data.casts.map(
      (person: any) => {
        console.info(person);
        this.personCountMap.set(person.name, (this.personCountMap.get(person.name) ?? 0) + 1);
      }
    );
  }

  returnSortedMapByHighest() {

    const sortedMap = new Map([...this.personCountMap.entries()]
      .sort(
        (p1, p2) => p2[1] - p1[1]
      )
    )
    return sortedMap;
  }

  returnSortedMapByLowest() {

    const sortedMap = new Map([...this.personCountMap.entries()]
      .sort(
        (p1, p2) => p1[1] - p2[1]
      )
    )
    return sortedMap;
  }
}

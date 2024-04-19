import { Injectable } from '@angular/core';
import { Person } from '../utility/models';

@Injectable({
  providedIn: 'root'
})
  
export class ParseService {

  // e.g. K : V => "Unnatural" (name) : "25422-unnatural" (id)
  completedDramasMap: Map<string, string> = new Map;

  // e.g. K : V => "Ishihara Satomi" (name) : 1 (Person.count)
  personCountMap: Map<string, Person> = new Map;

  retrieveCompletedDramas(res: any): void {

    res.data.list.Completed.items.map(
      (drama: any) => {
        this.completedDramasMap.set(drama.name, drama.id)
      }
    );
  }

  populatePersonCount(res: any): void {

    const dramaName: string = res.data.complete_title;

    res.data.casts.map(
      (person: any) => {

        const personName: string = person.name;

        if (!this.personCountMap.get(personName)) {
          const newPerson: Person = {
            count: 1,
            image: person.profile_image,
            link: person.link,
            dramas: [dramaName]
          };

          this.personCountMap.set(personName, newPerson);
        }

        else {
          const existingPerson: Person = this.personCountMap.get(personName)!;

          existingPerson.count++;

          if (!existingPerson.dramas.includes(dramaName)) {
            existingPerson.dramas.push(dramaName);
          }

          this.personCountMap.set(personName, existingPerson);
        }
      }
    );
  }

  returnSortedMapByHighest(): Map<string, Person> {

    const sortedMap = new Map([...this.personCountMap.entries()]
      .sort(
        (p1, p2) => p2[1].count - p1[1].count
      )
    )
    return sortedMap;
  }

  returnSortedMapByLowest(): Map<string, Person> {

    const sortedMap = new Map([...this.personCountMap.entries()]
      .sort(
        (p1, p2) => p1[1].count - p2[1].count
      )
    )
    return sortedMap;
  }

  resetMaps(): void {
    
    this.completedDramasMap = new Map();
    this.personCountMap = new Map();
  }
}

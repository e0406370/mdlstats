import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
export class ApiService {

  private http = inject(HttpClient);

  private API_USER_DRAMALIST = "https://kuryana.vercel.app/dramalist";
  private API_PERSON_INFO = "https://kuryana.vercel.app/people";
  private API_DRAMA_INFO = "https://kuryana.vercel.app/id";

  // in this format: abc123 of https://mydramalist.com/profile/abc123
  public retrieveUserDramaList(userID: string): Promise<any> {

    return firstValueFrom(this.http.get<any>(`${this.API_USER_DRAMALIST}/${userID}`));
  }

  // in this format: 494-ishihara-satomi of https://mydramalist.com/people/494-ishihara-satomi
  public retrievePersonInfo(personID: string): Promise<any> {

    return firstValueFrom(this.http.get<any>(`${this.API_PERSON_INFO}/${personID}`));
  }

  // in this format: 25422-unnatural of https://mydramalist.com/25422-unnatural
  public retrieveDramaInfo(dramaID: string): Promise<any> {

    return firstValueFrom(this.http.get<any>(`${this.API_DRAMA_INFO}/${dramaID}`));
  }
}

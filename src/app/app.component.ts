import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from './service/api.service';
import { ParseService } from './service/parse.service';
import { Person } from './utility/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
  
export class AppComponent implements OnInit {

  title = 'MyDramaList Statistics';

  private fb = inject(FormBuilder);
  form!: FormGroup;

  private appSvc = inject(ApiService);
  private parseSvc = inject(ParseService);

  firstResult = true;
  results: Map<string, Person> = new Map;

  ngOnInit(): void {

    this.form = this.createForm();
  }

  createForm(): FormGroup {

    return this.fb.group({
      user: this.fb.control<string>(''),
    });
  }

  submitForm(): void {

    const userID = this.form.value['user'];
    const promises: Promise<any>[] =[];

    promises.push(
      this.appSvc
        .retrieveUserDramaList(userID)
        .then((res) => {
          this.parseSvc.retrieveCompletedDramas(res);
        })
        .catch((err) => {
          console.error(err);
        })
    );
  
    for (const dramaID of this.parseSvc.completedDramasMap.values()) {
      promises.push(
        this.appSvc
          .retrieveDramaInfo(dramaID)
          .then((res) => {
            this.parseSvc.populatePersonCount(res);
          })
          .catch((err) => {
            console.error(err);
          })
      );
    }

    Promise.all(promises)
      .then(() => {
        this.firstResult = false;
        this.results = this.parseSvc.returnSortedMapByHighest();
      })
      .catch((err) => console.error(err));
  }

  resetForm(): void {
    this.form = this.createForm();
    this.firstResult = true;
    this.results = new Map;
  }
}
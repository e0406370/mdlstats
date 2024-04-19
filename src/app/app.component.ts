import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from './service/api.service';
import { ParseService } from './service/parse.service';
import { Person } from './utility/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
  
export class AppComponent implements OnInit {

  private fb = inject(FormBuilder);
  form!: FormGroup;

  appSvc = inject(ApiService);
  parseSvc = inject(ParseService);

  userID!: string;
  results: Map<string, Person> = new Map();

  firstPhaseCompleted = false;
  secondPhaseCompleted = false;

  firstPhaseError = false;
  secondPhaseError = false;

  ngOnInit(): void {

    this.form = this.createForm();
  }

  createForm(): FormGroup {

    return this.fb.group({
      user: this.fb.control<string>('', [ Validators.required ]),
    });
  }

  resetForm(): void {

    this.form = this.createForm();

    this.results = new Map;
    this.parseSvc.resetMaps();

    this.firstPhaseCompleted = false;
    this.secondPhaseCompleted = false;

    this.firstPhaseError = false;
    this.secondPhaseError = false;
  }

  submitFirstPhase(): void {

    this.userID = this.form.value["user"];

    this.appSvc
      .retrieveUserDramaList(this.userID)
      .then((res) => {

        this.parseSvc.retrieveCompletedDramas(res);

        this.firstPhaseCompleted = true;
        console.info(this.parseSvc.completedDramasMap);
      })
      .catch((err) => {

        this.firstPhaseError = true;
        console.error(err);
      });
  }

  submitSecondPhase(): void {

    const promises: Promise<any>[] = [];

    for (const dramaID of this.parseSvc.completedDramasMap.values()) {
      promises.push(this.appSvc
        .retrieveDramaInfo(dramaID)
        .then((res) => {

          this.parseSvc.populatePersonCount(res);
        })
        .catch((err) => {
          
          this.secondPhaseError = true;
          console.error(err);
        })
      );
    };

    Promise.all(promises)
      .finally(() => {
        
        this.secondPhaseCompleted = true;
        this.results = this.parseSvc.returnSortedMapByHighest();
      }
    );
  }
}
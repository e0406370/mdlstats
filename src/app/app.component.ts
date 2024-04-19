import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './api.service';
import { ParseService } from './parse.service';

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

  ngOnInit(): void {

    this.form = this.createForm();
  }

  createForm(): FormGroup {

    return this.fb.group({
      user: this.fb.control<string>(''),
    });
  }

  submitForm(): void {

    const userVal = this.form.value['user'];

    this.appSvc
      .retrieveUserDramaList(userVal)
      .then((res) => {
        this.parseSvc.retrieveCompletedDramas(res);

        for (const dramaID of this.parseSvc.completedDramasMap.values()) {
          this.appSvc.retrieveDramaInfo(dramaID)
            .then((res) => {
              this.parseSvc.populatePersonCount(res);
              console.info(this.parseSvc.returnSortedMapByHighest());
            })
            .catch((err) => {
              console.error(err);
            })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './service/api.service';
import { ParseService } from './service/parse.service';

import { MapEntriesPipe } from './pipe/entries.pipe';
import { SortByTitlePipe } from './pipe/sort.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MapEntriesPipe,
    SortByTitlePipe
  ],
  providers: [
    ApiService,
    ParseService
  ],
  bootstrap: [AppComponent],
})
  
export class AppModule {}

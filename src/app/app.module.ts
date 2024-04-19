import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ParseService } from './parse.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApiService, ParseService],
  bootstrap: [AppComponent],
})
export class AppModule {}

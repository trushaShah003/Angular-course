import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

import { AppComponent } from './app.component';
import { shortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [AppComponent, shortenPipe, FilterPipe],
  imports: [BrowserModule, FormsModule],
  providers: [NgModel],
  bootstrap: [AppComponent],
})
export class AppModule {}

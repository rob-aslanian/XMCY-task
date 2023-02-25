import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    HeaderComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    ImageCardComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

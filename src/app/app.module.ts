import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LayoutModule} from './layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {FileService} from './services/file.service';
import {GlobalService} from './services/global.service';
import {AuthService} from './services/auth.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/auth.guard';
import {PinGuard} from './services/pin.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [FileService, GlobalService, AuthService, AuthGuard, PinGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

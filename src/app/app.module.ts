import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LayoutModule} from './layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {FileService} from './services/file.service';
import {FileExplorerModule} from './components/file-explorer/file-explorer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ComponentsModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {MainComponent} from './main/main.component';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
  ]
})

export class LayoutModule { }

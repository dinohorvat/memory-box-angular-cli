import {NgModule} from '@angular/core';
import {MainComponent} from './main/main.component';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule
  ]
})

export class LayoutModule { }

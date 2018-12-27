import {NgModule} from '@angular/core';
import {MainComponent} from './main/main.component';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule
  ]
})

export class LayoutModule { }

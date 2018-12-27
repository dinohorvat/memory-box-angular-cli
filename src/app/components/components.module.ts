import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AlbumsComponent} from './albums/albums.component';
import {BackupMediaComponent} from './backup-media/backup-media.component';
import {DeviceSetupComponent} from './device-setup/device-setup.component';
import {ExportMediaComponent} from './export-media/export-media.component';
import {ImportMediaComponent} from './import-media/import-media.component';
import {MediaManagerComponent} from './media-manager/media-manager.component';
import {PlayingNowComponent} from './playing-now/playing-now.component';

@NgModule({
  declarations: [
    AlbumsComponent,
    BackupMediaComponent,
    DeviceSetupComponent,
    ExportMediaComponent,
    ImportMediaComponent,
    LoginComponent,
    MediaManagerComponent,
    PlayingNowComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ]
})

export class ComponentsModule { }

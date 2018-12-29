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
import {DeviceNewComponent} from './device-new/device-new.component';
import {FileExplorerModule} from './file-explorer/file-explorer.module';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatOptionModule, MatProgressBarModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {DeviceSelectComponent} from './login/device-select/device-select.component';
import {PinPageComponent} from './login/pin-page/pin-page.component';

@NgModule({
  declarations: [
    AlbumsComponent,
    BackupMediaComponent,
    DeviceNewComponent,
    DeviceSelectComponent,
    DeviceSetupComponent,
    ExportMediaComponent,
    ImportMediaComponent,
    LoginComponent,
    MediaManagerComponent,
    PlayingNowComponent,
    PinPageComponent
  ],
  imports: [
    BrowserModule,
    FileExplorerModule,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})

export class ComponentsModule { }

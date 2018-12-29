import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {PlayingNowComponent} from './components/playing-now/playing-now.component';
import {BackupMediaComponent} from './components/backup-media/backup-media.component';
import {DeviceSetupComponent} from './components/device-setup/device-setup.component';
import {AlbumsComponent} from './components/albums/albums.component';
import {ExportMediaComponent} from './components/export-media/export-media.component';
import {ImportMediaComponent} from './components/import-media/import-media.component';
import {MediaManagerComponent} from './components/media-manager/media-manager.component';
import {DeviceNewComponent} from './components/device-new/device-new.component';
import {DeviceSelectComponent} from './components/login/device-select/device-select.component';
import {PinPageComponent} from './components/login/pin-page/pin-page.component';
import {AuthGuard} from './services/auth.guard';
import {PinGuard} from './services/pin.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'main/login',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: MainComponent,
        children: [
          {path: 'login', component: LoginComponent},
          {path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard]},
          {path: 'backup', component: BackupMediaComponent, canActivate: [AuthGuard]},
          {path: 'new', component: DeviceNewComponent},
          {path: 'device', component: DeviceSetupComponent, canActivate: [AuthGuard]},
          {path: 'deviceselect', component: DeviceSelectComponent, canActivate: [AuthGuard]},
          {path: 'export', component: ExportMediaComponent, canActivate: [AuthGuard]},
          {path: 'import', component: ImportMediaComponent, canActivate: [AuthGuard]},
          {path: 'media', component: MediaManagerComponent, canActivate: [AuthGuard]},
          {path: 'playing', component: PlayingNowComponent, canActivate: [AuthGuard]},
          {path: 'pin', component: PinPageComponent, canActivate: [PinGuard]},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

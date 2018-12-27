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
          {path: 'albums', component: AlbumsComponent},
          {path: 'backup', component: BackupMediaComponent},
          {path: 'device', component: DeviceSetupComponent},
          {path: 'export', component: ExportMediaComponent},
          {path: 'import', component: ImportMediaComponent},
          {path: 'media', component: MediaManagerComponent},
          {path: 'playing', component: PlayingNowComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

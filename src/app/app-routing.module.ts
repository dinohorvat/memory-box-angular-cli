import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {LoginComponent} from './components/login/login.component';

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
          {path: 'login', component: LoginComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  public navigationItems = [
    {name: 'Home', path: '/main/login', icon: 'fa-home', icon_background_color: '#6AC431'},
    {name: 'Playing Now', path: '/main/playing', icon: 'fa-play-circle', icon_background_color: '#31A68A'},
    {name: 'Media Manager', path: '/main/media', icon: 'fa-folder', icon_background_color: '#6E028D'},
    {name: 'Import Media', path: '/main/import', icon: 'fa-upload', icon_background_color: '#E9B800'},
    // {name: 'Export Media', path: '/main/export', icon: 'fa-download', icon_background_color: '#90ABBC'},
    {name: 'Albums Media', path: '/main/albums', icon: 'fa-images', icon_background_color: '#F58000'},
    {name: 'Back-up Media', path: '/main/backup', icon: 'fa-database', icon_background_color: '#FC9CB7'},
    {name: 'Device Setup', path: '/main/device', icon: 'fa-cog', icon_background_color: '#0273C3'},
    {name: 'Exit', path: 'home', icon: 'fa-sign-out-alt', icon_background_color: '#ED3A3E'}
  ];
  ngOnInit(): void {

  }

  // Triggering the sidebar to close
  onRouteChange() {
    const body: HTMLElement = document.getElementById('menu-hider');
    body.click();
  }
}

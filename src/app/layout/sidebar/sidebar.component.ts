import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  public navigationItems = [
    {name: 'Home', path: '/main/login', icon: 'fa-home', icon_background_color: '#6AC431'},
    {name: 'Remote Control', path: '/main/playing', icon: 'fa-play-circle', icon_background_color: '#a66931'},
    {name: 'Media Manager', path: '/main/media', icon: 'fa-folder', icon_background_color: '#6E028D'},
    {name: 'Import Media', path: '/main/import', icon: 'fa-upload', icon_background_color: '#E9B800'},
    {name: 'Export Media', path: '/main/export', icon: 'fa-download', icon_background_color: '#90ABBC'},
    {name: 'Albums Media', path: '/main/albums', icon: 'fa-images', icon_background_color: '#F58000'},
    {name: 'Back-up Media', path: '/main/backup', icon: 'fa-database', icon_background_color: '#FC9CB7'},
    {name: 'Device Setup', path: '/main/device', icon: 'fa-cog', icon_background_color: '#0273C3'},
    {name: 'Exit', path: '/main/login', icon: 'fa-sign-out-alt', icon_background_color: '#ED3A3E'}
  ];

  constructor(private router: Router, private globalService: GlobalService) {}
  ngOnInit(): void {

  }

  checkRedirect(item, event) {
    if ((this.router.url === '/main/playing') && (item.name === 'Home' || item.name === 'Exit')) {
      if (confirm('This action will stop your current playlist. Do you wish to proceed?')) {
        this.globalService.stopMedia();
        this.router.navigate([item.path]);
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    } else {
      this.router.navigate([item.path]);
    }
  }
  // Triggering the sidebar to close
  onRouteChange() {
    const body: HTMLElement = document.getElementById('menu-hider');
    body.click();
  }
}

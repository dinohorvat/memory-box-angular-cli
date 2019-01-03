import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playlist-order',
  templateUrl: './playlist-order.component.html',
  styleUrls: ['./playlist-order.component.scss']
})

export class PlaylistOrderComponent implements OnInit {

  constructor(public globalService: GlobalService, public authService: AuthService,
              private router: Router) {
  }
  playlistItems = [];
  serverIp;
  duration = 5;
  ngOnInit(): void {
    this.serverIp = this.authService.node_url_1;
    this.playlistItems = this.getActivePlaylist();
    console.log(this.playlistItems);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlistItems, event.previousIndex, event.currentIndex);
  }

  getActivePlaylist() {
    return this.globalService.activePlayList;
  }

  play() {
    this.router.navigate(['/main/playing']);
    // this.globalService.playMedia().subscribe((res: any) => {
    //   console.log(res);
    //   this.router.navigate(['/main/playing']);
    // });
  }
}

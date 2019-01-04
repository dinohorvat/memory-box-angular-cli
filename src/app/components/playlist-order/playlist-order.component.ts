import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {LocalStoreService} from '../../services/local-store.service';

@Component({
  selector: 'app-playlist-order',
  templateUrl: './playlist-order.component.html',
  styleUrls: ['./playlist-order.component.scss']
})

export class PlaylistOrderComponent implements OnInit {

  albumName;

  constructor(public globalService: GlobalService, public authService: AuthService,
              private router: Router, public route: ActivatedRoute, public storage: LocalStoreService) {
    this.route.queryParams.subscribe((params) => {
        this.albumName = params.albumName;
    });
  }
  playlistItems = [];
  serverIp;
  duration = 5;
  ngOnInit(): void {
    this.serverIp = this.authService.node_url_1;
    if (this.storage.getItem(this.albumName)) {
      this.playlistItems = JSON.parse(this.storage.getItem(this.albumName));
    } else {
      this.playlistItems = this.getActivePlaylist();
    }
    console.log(this.playlistItems);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlistItems, event.previousIndex, event.currentIndex);
    console.log(this.playlistItems);
    if (!isNullOrUndefined(this.albumName)) {
      this.storage.setItem(this.albumName, JSON.stringify(this.playlistItems));
    }
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

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
  playlistItems = [];
  serverIp;
  duration = 5;

  constructor(public globalService: GlobalService, public authService: AuthService,
              private router: Router, public route: ActivatedRoute, public storage: LocalStoreService) {
    this.route.queryParams.subscribe((params) => {
        this.albumName = params.albumName;
    });
  }

  ngOnInit(): void {
    this.serverIp = this.authService.node_url_1;
    // If the order doesn't exist in storage, get the playlist from service as it is
    if (!this.getAlbumPlaylist()) {
      this.playlistItems = this.getActivePlaylist();
    }
    console.log(this.playlistItems);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlistItems, event.previousIndex, event.currentIndex);
    // If it's album, save the order in storage
    if (!isNullOrUndefined(this.albumName)) {
      const storageAlbum: StorageAlbum = new StorageAlbum(this.playlistItems, this.albumName, this.duration);
      this.storage.setItem(this.albumName, JSON.stringify(storageAlbum));
    }
  }

  /*
    Get from local storage
   */
  getAlbumPlaylist() {
    if (!this.storage.getItem(this.albumName)) {
      return false;
    } else {
      const storageAlbum: StorageAlbum = this.storage.getItem(this.albumName);
      this.playlistItems = storageAlbum.playlist;
      this.albumName = storageAlbum.albumName;
      this.duration = storageAlbum.duration;
      return storageAlbum;
    }
  }

  getActivePlaylist() {
    return this.globalService.activePlayList;
  }

  play() {
    this.globalService.playMedia(this.duration).subscribe((res_: any) => {
      this.router.navigate(['/main/playing']);
    });
  }
}

export class StorageAlbum {
  playlist: any;
  albumName: string;
  duration: number;

  constructor(playlist_, albumName_, duration_) {
    this.playlist = playlist_;
    this.albumName = albumName_;
    this.duration = duration_;
  }
}

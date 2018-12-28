import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})

export class AlbumsComponent implements OnInit {
  constructor(public globalService: GlobalService, public router: Router) {}

  albums = [];
  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.globalService.getAlbums().subscribe((res: any) => {
      console.log(res);
      if (res.children) {
        this.albums = res.children;
      }
    });
  }

  openAlbum(album) {

  }

  deleteAlbum(albumName) {
    this.globalService.deleteAlbum(albumName).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        alert('Album deleted');
        this.getAlbums();
      }
    });
  }
}

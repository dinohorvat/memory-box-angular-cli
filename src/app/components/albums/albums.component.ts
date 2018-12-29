import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {Router} from '@angular/router';
import {FileElement} from '../file-explorer/model/element';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})

export class AlbumsComponent implements OnInit {
  constructor(public globalService: GlobalService, public router: Router,
              public fileService: FileService) {}

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
    this.fileService.map = new Map<string, FileElement>();
    const _mediaManagerItems = album.children.map( (item: any) => {
      const _item = {
        isFolder: false,
        name: item.name,
        parent: 'root',
        path: item.path,
        selected: false
      };
      this.fileService.add(_item);
      return _item;
    });
    this.router.navigate(['/main/media'], {queryParams: {album: true, albumName: album.name}});
    console.log(_mediaManagerItems);
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

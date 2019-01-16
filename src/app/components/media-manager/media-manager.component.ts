import {Component, OnInit} from '@angular/core';
import {FileElement} from '../file-explorer/model/element';
import {Observable} from 'rxjs';
import {FileService} from '../../services/file.service';
import {GlobalService} from '../../services/global.service';
import {isNullOrUndefined} from 'util';
import saveAs from 'file-saver';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStoreService} from '../../services/local-store.service';
import {StorageAlbum} from '../playlist-order/playlist-order.component';

@Component({
  selector: 'app-media-manager',
  templateUrl: './media-manager.component.html',
  styleUrls: ['./media-manager.component.scss']
})

export class MediaManagerComponent implements OnInit {
  public fileElements: Observable<FileElement[]>;
  public mediaManagerName = 'Media Manager';
  constructor(public fileService: FileService, public globalService: GlobalService,
              public router: Router, public _route: ActivatedRoute, public storage: LocalStoreService) {}

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;
  addAlbum = false; // If adding new items to existing album
  canRefresh = true; // Also used to distinguish if the Media Manager is in Album view (Triggered from Album) -- false means its Album

  ngOnInit() {
    // If it's not a call from Album --- Load media from API
    this._route.queryParams.subscribe((params) => {
      if (!params.album) {
        this.getMediaFiles();
        if (params.addAlbum) {
          this.mediaManagerName = params.albumName;
          this.addAlbum = true;
        }
        console.log('fileServiceMap:', this.fileService.map);
        console.log('globalService:', this.globalService.mediaFileTree);
        this.canRefresh = true;
      } else {
        this.canRefresh = false;
        this.mediaManagerName = params.albumName;
        this.updateFileElementQuery();
      }
    });
  }

  getMediaFiles() {
    this.globalService.blockUserInterface('Loading Media...');
    this.globalService.getMedia().subscribe((res: any) => {
      console.log('media', res);
      this.fileService.map = new Map<string, FileElement>();
      for (const file of res) {
        if (file.name.endsWith('.avi') || file.name.endsWith('.mov') || file.name.endsWith('.mp4')) {
          file.type = 'video';
        } else {
          file.type = 'photo';
        }
        this.fileService.add(file);
      }
      this.updateFileElementQuery();
      this.globalService.unblockUserInterface();
    });
  }

  downloadElement(element: FileElement) {
    this.globalService.downloadMedia(element).subscribe((res): any => {
      const content = res.body;
      const fileName = res.headers.get('content-filename');
      saveAs(content, fileName);
    });
  }

  playSelected() {
    const selectedItems = Array.from(this.fileService.map.values()).
    filter((item: FileElement) => item.selected === true);
    if ((selectedItems.length === 0 && this.canRefresh)) {
      alert('Please select media to play');
      return;
    }

    // Creating temporary playlist
    if (this.canRefresh) {
      this.globalService.createTemporaryPlaylist(selectedItems).subscribe((res) => {
        console.log(res);
          this.playTempPlayListItems(selectedItems);
      });
    } else {
      this.playAlbumItems(Array.from(this.fileService.map.values()));
    }
  }

  addToAlbum() {
    if (this.canRefresh) {
        this.createAlbum();
    }
    this.router.navigate(['/main/media'], {queryParams: {addAlbum: true, albumName: this.mediaManagerName}});
  }

  playAlbumItems(selectedItems) {
    const _tempPlayList = selectedItems.map( (item: any) => {
      const _item = {
        path: item.path,
        thumbPath: item.path.substring('/home/pi/jp/SmartPlay/assets'.length),
        type: 'photo',
        videoPath: item.videoPath
      };
      if (item.name.endsWith('.avi') || item.name.endsWith('.mov') || item.name.endsWith('.mp4')) {
        _item.type = 'video';
      }
      return _item;
    });
    console.log(_tempPlayList);
    this.globalService.activePlayList = _tempPlayList;
    this.router.navigate(['/main/playlistOrder'], {queryParams: {albumName: this.mediaManagerName}});
    // this.globalService.playMedia().subscribe((res: any) => {
    //   console.log(res);
    //   this.router.navigate(['/main/playing']);
    // });
  }

  playTempPlayListItems(selectedItems) {
    console.log(selectedItems);
    const _tempPlayList = selectedItems.map( (item: any) => {
      const _item = {
        path: item.path,
        thumbPath: '/data/tempPlaylist/' + item.name,
        videoPath: item.videoPath,
        type: 'photo',
        name: item.name
      };
      if (item.name.endsWith('.avi') || item.name.endsWith('.mov') || item.name.endsWith('.mp4')) {
        _item.type = 'video';
      }
      return _item;
    });
    console.log(_tempPlayList);
    this.globalService.activePlayList = _tempPlayList;
    this.router.navigate(['/main/playlistOrder']);
    // this.globalService.playMedia().subscribe((res: any) => {
    //   console.log(res);
    //   this.router.navigate(['/main/playing']);
    // });
  }

  deleteSelected() {
    const selectedItems = Array.from(this.fileService.map.values()).
    filter((item: FileElement) => item.selected === true);
    this.globalService.deleteFiles(selectedItems).subscribe((res: any) => {
      if (res.success) {
        for (const element of selectedItems) {
          this.removeElement(element, true);
        }
      }
    });
  }

  createAlbum() {
    console.log(this.fileService.map);
    const selectedItems = Array.from(this.fileService.map.values()).
                  filter((item: FileElement) => item.selected === true);
    console.log(selectedItems);
    if (selectedItems.length === 0) {
      alert('Please select media to add in album');
      return;
    }
    let albumName;
    if (!this.addAlbum) {
      albumName = prompt('Please enter new album name');
    }
    if (this.addAlbum) {
      albumName = this.mediaManagerName;
    }

    if (isNullOrUndefined(albumName)) {
      return;
    }
    this.globalService.blockUserInterface('Creating Album...');
    this.globalService.createAlbum(albumName, selectedItems).subscribe((res: any) => {
      console.log(res);
      this.globalService.unblockUserInterface();
      if (this.addAlbum) {
          if (this.storage.getItem(this.mediaManagerName)) {
            const playlistObj: any = this.storage.getItem(this.mediaManagerName);
            for (const element of selectedItems) {
              console.log(element);
              playlistObj.playlist.push(element);
              this.storage.setItem(this.mediaManagerName, JSON.stringify(playlistObj));
              console.log(playlistObj);
            }
        }
        alert('Added to the album');
      } else {
        if (res.success) {
          alert('Album Created');
        } else {
          alert('Something went wrong. Please try again later.');
        }
      }
    });
  }

  addFolder(folder: { name: string }) {
    this.fileService.add({ isFolder: true, selected: false, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    this.updateFileElementQuery();
  }

  selectElement(element: FileElement) {
    this.fileService.update(element.id, {selected: element.selected});
    this.updateFileElementQuery();
  }

  removeElement(element: FileElement, redButton) {
    // Red Button --> if request is coming from a click in footer
    if (this.canRefresh) {
      if (this.storage.getItem(this.mediaManagerName)) {
        const playlistObj: any = this.storage.getItem(this.mediaManagerName);
        console.log(element);
        playlistObj.playlist = playlistObj.playlist.filter(( obj ) => {
          return obj.path !== element.path;
        });
        this.storage.setItem(this.mediaManagerName, JSON.stringify(playlistObj));
        console.log(playlistObj);
        // TODO: Finish it
      }
    }
    if (redButton) {
      this.fileService.delete(element.id);
      this.updateFileElementQuery();
    } else {
      const selectedFile = [element];
      this.globalService.deleteFiles(selectedFile).subscribe((res: any) => {
        if (res.success) {
          this.fileService.delete(element.id);
          this.updateFileElementQuery();
        }
      });
    }
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id, { parent: event.moveTo.id });
    this.updateFileElementQuery();
  }

  renameElement(element: FileElement) {
    this.fileService.update(element.id, { name: element.name });
    this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    const split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }
}

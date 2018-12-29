import {Component, OnInit} from '@angular/core';
import {FileElement} from '../file-explorer/model/element';
import {Observable} from 'rxjs';
import {FileService} from '../../services/file.service';
import {GlobalService} from '../../services/global.service';
import {isNullOrUndefined} from 'util';
import saveAs from 'file-saver';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

@Component({
  selector: 'app-media-manager',
  templateUrl: './media-manager.component.html',
  styleUrls: ['./media-manager.component.scss']
})

export class MediaManagerComponent implements OnInit {
  public fileElements: Observable<FileElement[]>;
  public mediaManagerName = 'Media Manager';
  constructor(public fileService: FileService, public globalService: GlobalService,
              public router: Router, public _route: ActivatedRoute) {}

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;
  canRefresh = true;

  ngOnInit() {
    // If it's not a call from Album --- Load media from API
    this._route.queryParams.subscribe((params) => {
      if (!params.album) {
        this.getMediaFiles();
        console.log('fileServiceMap:', this.fileService.map);
        console.log('globalService:', this.globalService.mediaFileTree);
      } else {
        this.canRefresh = false;
        this.mediaManagerName = params.albumName;
        this.updateFileElementQuery();
      }
    });
  }

  getMediaFiles() {
    this.globalService.getMedia().subscribe((res: any) => {
      console.log('media', res);
      this.fileService.map = new Map<string, FileElement>();
      for (const file of res) {
        this.fileService.add(file);
      }
      this.updateFileElementQuery();
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
    if (selectedItems.length === 0) {
      alert('Please select media to play');
      return;
    }
    const _tempPlayList = selectedItems.map( (item: any) => {
      const _item = {
        path: item.path.substring('/home/pi/jp/SmartPlay/express-server/assets'.length),
        type: 'photo'
      };
      return _item;
    });
    console.log(_tempPlayList);
    this.globalService.activePlayList = _tempPlayList;
    this.globalService.playMedia().subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/main/playing']);
    });
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
    const albumName = prompt('Please enter new album name');

    if (isNullOrUndefined(albumName)) {
      return;
    }
    this.globalService.createAlbum(albumName, selectedItems).subscribe((res) => {
      console.log(res);
      alert('Album Created');
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

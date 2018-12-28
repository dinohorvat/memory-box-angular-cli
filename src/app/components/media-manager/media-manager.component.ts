import {Component, OnInit} from '@angular/core';
import {FileElement} from '../file-explorer/model/element';
import {Observable} from 'rxjs';
import {FileService} from '../../services/file.service';
import {GlobalService} from '../../services/global.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-media-manager',
  templateUrl: './media-manager.component.html',
  styleUrls: ['./media-manager.component.scss']
})

export class MediaManagerComponent implements OnInit {
  public fileElements: Observable<FileElement[]>;

  constructor(public fileService: FileService, public globalService: GlobalService) {}

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;

  ngOnInit() {
    this.getMediaFiles();
    console.log('fileServiceMap:', this.fileService.map);
    console.log('globalService:', this.globalService.mediaFileTree);
  }

  getMediaFiles() {
    this.globalService.getMedia().subscribe((res: any) => {
      this.fileService.map = new Map<string, FileElement>();
      for (const file of res) {
        this.fileService.add(file);
      }
      this.updateFileElementQuery();
    });
  }

  playSelected() {

  }

  deleteSelected() {
    const selectedItems = Array.from(this.fileService.map.values()).
    filter((item: FileElement) => item.selected === true);
    this.globalService.deleteFiles(selectedItems).subscribe((res: any) => {
      this.getMediaFiles();
    });
  }

  createAlbum() {
    console.log(this.fileService.map);
    const selectedItems = Array.from(this.fileService.map.values()).
                  filter((item: FileElement) => item.selected === true);
    console.log(selectedItems);
    if (selectedItems.length === 0) {
      alert('Please select items to add in album');
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

  removeElement(element: FileElement) {
    this.fileService.delete(element.id);
    this.updateFileElementQuery();
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

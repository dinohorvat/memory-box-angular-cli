import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileElement } from './model/element';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './modals/newFolderDialog/newFolderDialog.component';
import { RenameDialogComponent } from './modals/renameDialog/renameDialog.component';
import {AuthService} from '../../services/auth.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent {
  constructor(public dialog: MatDialog, public auth?: AuthService, public globalService?: GlobalService) {
    this.thumbnailRootPath = this.auth.node_url_1;
    this.mediaUrl = this.auth.media_url;
    this.nodeUrl = this.auth.node_url_1;
  }

  thumbnailRootPath = '';
  mediaUrl = '';
  nodeUrl = '';
  @Input() fileElements: FileElement[];
  @Input() canNavigateUp: string;
  @Input() canRefresh: boolean; // Also used if user is coming from Album or opening normal Media Manager
  @Input() path: string;
  @Input() name: string;

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementSelected = new EventEmitter<FileElement>();
  @Output() elementDownload = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();
  @Output() refreshFiles = new EventEmitter();

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  dropEvent(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.fileElements, event.previousIndex, event.currentIndex);
  }

  selectElement(element: FileElement) {
    element.selected = !element.selected;
    this.elementSelected.emit(element);
  }
  reloadFiles() {
    this.refreshFiles.emit(true);
  }

  downloadElement(element: FileElement) {
    this.elementDownload.emit(element);
  }

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    const dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    console.log(element);
    const dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.componentInstance.currentName = element.name;
    let path_ = element.path;
    path_ = path_.substr(0, path_.lastIndexOf('/'));
    dialogRef.componentInstance.filePath = element.path;
    let newPath = path_ + '/';
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        newPath += res;
        this.globalService.renameFile({oldPath: element.path, newPath: newPath}).subscribe((res_) => {
          console.log(res_);
          element.name = res;
          this.elementRenamed.emit(element);
        });

      }
    });
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }
}

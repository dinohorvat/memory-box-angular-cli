import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-playlist-order',
  templateUrl: './playlist-order.component.html',
  styleUrls: ['./playlist-order.component.scss']
})

export class PlaylistOrderComponent implements OnInit {

  constructor(public globalService: GlobalService) {
  }
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
  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}

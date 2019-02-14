import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Team } from '../brackets/team';

@Component({
  selector: 'vb-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnChanges {
  constructor(team: Team = new Team(), cls: string = "blank"){
    this.team = team;
    this.class = cls;
}
  @Input() team: Team;
  class: string;
  position: string;

  @Output() cellClicked: EventEmitter<string> = 
    new EventEmitter<string>();

  ngOnChanges(): void {
  }
  onClick(): void {
    this.cellClicked.emit(`The team ${this.team.name} was clicked!`);
  }
}

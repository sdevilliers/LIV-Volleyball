import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vb-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() rating: number;
  starWid
  teamName: string;
  class: string;

  constructor(name: string = " ", cls: string = "blank") {
    this.teamName = name;
    this.class = cls;
  }

  ngOnInit() {
  }

}

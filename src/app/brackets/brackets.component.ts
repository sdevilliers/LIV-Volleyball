import { Component, OnInit } from '@angular/core';
import { BracketLogic } from './bracketLogic';
import { Team } from './team';

@Component({
  selector: 'vb-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})  
export class BracketsComponent implements OnInit {

  bracket: BracketLogic;    //The data: a bracket object where all the tournament deatails are kept
  teamCount: number;

  constructor() {
  }

  createBracket(teamCount: number): void {
    //sets the teams array -- this code will be moved later
    let teams: Team[] = [];
    //remember after move to ensure that teams cannot be less than 2
    for (let i = 0; i < teamCount; i++) {
      teams[i] = new Team;
      teams[i].name = "Team" + (i + 1);
      teams[i].seed = i + 1;
    }
    this.bracket = new BracketLogic(teams);
  }

  ngOnInit() {
  }

}

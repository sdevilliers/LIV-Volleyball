import { Component, OnInit } from '@angular/core';
import { BracketLogic } from './bracketLogic';
import { ITeam } from './team';

@Component({
  selector: 'vb-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})
export class BracketsComponent implements OnInit {
 
  bracket: BracketLogic;                   //The data: a bracket object where all the tournament deatails are kept
  teamsLength: number;
  
  constructor() {     
  }

  createBracket(teamsLength: number):void {
    let teams: ITeam[] = [];               //sets the teams array -- this code will be moved later
    for (let i = 0; i < teamsLength; i++) {          //remember after move to ensure that teams cannot be less than 2
      teams[i] = new ITeam;
      teams[i].name = "Team" + (i+1);
    }
    this.bracket = new BracketLogic(teams);
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { BracketLogic } from './bracketLogic';

import { Team } from './team';
import { TeamService } from './team.service';

@Component({
  selector: 'vb-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})  
export class BracketsComponent implements OnInit {

  bracket: BracketLogic;    //The data: a bracket object where all the tournament deatails are kept
  teamCount: number;
  teams: Team[];
  errorMessage: string;

  constructor(private mysqlService: TeamService) { //Injects ProductService so that the data for porducts can be accessed with the local variable productService
    if (this.teams == undefined) {
      this.teams = [];
    }
  }

  createBracket(teamCount: number): void {
    //remember after move to ensure that teams cannot be less than 2
    let alertMessage: string;
    if (teamCount > 1 && teamCount <= 2000) {
      this.teams = [];
      for (let i = 0; i < teamCount; i++) {
        this.teams[i] = new Team;
        this.teams[i].name = "Team" + (i + 1);
        this.teams[i].seed = i + 1;
      }
    } else if (teamCount > 2000) {
      alertMessage = "Yeah right. Somehow I doubt that you have that many friends";
    } else if (teamCount < 2) {
      alertMessage = "You don't have enough teams to make a tournament. We used the database. \n Start networking. \n Find yourself some friends \n Facebook: https://www.facebook.com/"
      alert(alertMessage);
      this.dbBracket();
      return;
    } else {
      alertMessage = "You didn't specify an amount of teams, so we used the database.";
    }
    if (this.teams.length < 2) {
      alertMessage = "You don't have enough teams to make a tournament."
    } 
    if (alertMessage) {alert(alertMessage);}
    this.bracket = new BracketLogic(this.teams);
  }

  dbBracket(): void {
      let alertMessage: string;
      this.mysqlService.getLocalTeamDatas().subscribe(
        teams => {
          this.teams = teams
        },
        error => this.errorMessage = <any>error
      );
      if (this.teams.length < 2) {
        alertMessage = "You don't have enough teams to make a tournament. \n Start networking. \n Find yourself some friends \n Facebook: https://www.facebook.com/"
      }
      if (alertMessage) {alert(alertMessage);}
      this.bracket = new BracketLogic(this.teams);
  }

  ngOnInit() {
    this.mysqlService.getLocalTeamDatas().subscribe(
      teams => {
        this.teams = teams
      },
      error => this.errorMessage = <any>error
    );
  }

}
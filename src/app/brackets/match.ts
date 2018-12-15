import { ITeam } from "./team";
export class Match {
    matchID: number; //used to order the matches. begins at 0
    startRowIndex: number; //the location of the first cell of the match
    endRowIndex: number; //location of the last cell of the match
    teamOne: ITeam;
    teamTwo: ITeam;
    winner: ITeam;
    loser: ITeam;
    score: number[];
    empty: boolean;
    
    constructor(empty: boolean = true, id: number = null, cellIndex: number = null){
        this.empty = empty;
        this.matchID = id;
        this.startRowIndex = cellIndex;
        this.endRowIndex = this.startRowIndex + 1;
    }

    assignTeams(teams: ITeam[]){ // assigns two teams based on specially ordered list of seeded teams
        this.teamOne = teams[this.matchID*2];
        this.teamTwo = teams[this.matchID*2+1];
    }
}

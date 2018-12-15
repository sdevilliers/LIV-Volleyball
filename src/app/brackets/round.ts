import { ITeam } from "./team";
import { Match } from "./match";

export class Round {                                    //takes in the round # and teams as parameters to construct the round
    
    matchCount: number;
    gap: number;           //gap between matches 1 unit = 1 cell height
    smallGap: number; //the smaller gap at the top/bottom of the round. 
    matches: Match[] = []; //records the match locations by index value (each index value corresponds to 2 rows of the table)
    cellIndex: number = 0; //tracks the current index throughout the generation process
    
    constructor(matchCount: number, gap: number, smallGap: number) {
        this.gap = gap;
        this.matchCount = matchCount;
        this.smallGap = smallGap;
        this.generateRound();
    }

    generateRound(): void {
        this.fillGap(this.smallGap);
        let i;
        for (i = 0; i < this.matchCount-1; i++) { //fills in matches separated by this round's gap width
            this.matches[i] = new Match(false, i, this.cellIndex);
            this.cellIndex += 2;
            this.fillGap(this.gap);
        }
        this.matches[i] = new Match(false, i, this.cellIndex);
        this.fillGap(this.smallGap);
    }

    isNeat(length: number): boolean {
        let teamCount = length;
        while (1 < teamCount) {
            if (teamCount % 2 == 1) {
                return false;
            } else {
                teamCount = teamCount / 2;
            }
        }
        return true;
    }

    fillGap(gapLength: number) { //updates the current index to reflect the gaps between matches
        if (gapLength > 0) {
            this.cellIndex += gapLength;
        } else if (gapLength < 0){
            console.log("round.fillgap() recieved a negative gap: " + gapLength)
        }
    }

}

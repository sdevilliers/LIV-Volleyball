import { Team } from "./team";
import { Match } from "./match";

export class Round {                                    //takes in the round # and teams as parameters to construct the round
    
    matchCount: number;
    gap: number;           //gap between matches 1 unit = 1 cell height
    smallGap: number; //the smaller gap at the top/bottom of the round. 
    matches: Match[] = []; //records the match locations by index value (each index value corresponds to 2 rows of the table)
    
    constructor(matchCount: number, gap: number = 0, smallGap: number = 0) {
        this.gap = gap;
        this.matchCount = matchCount;
        this.smallGap = smallGap;
        this.matches = this.generateRound(gap, matchCount, smallGap);
    }

    generateRound(gap: number, matchCount: number, smallGap: number): Match[] {
        let matches: Match[] = [];
        let cellIndex: number = 0;
        cellIndex += smallGap;
        let i;
        //fills in matches separated by this round's gap width
        for (i = 0; i < matchCount-1; i++) { 
            //each match stores its position via the cellIndex
            matches[i] = new Match(false, i, cellIndex);
            cellIndex += 2;
            cellIndex += gap;
        }
        matches[i] = new Match(false, i, cellIndex);
        cellIndex += smallGap;
        return matches;
    }

    isNeat(): boolean {
        let matchCount = this.matches.length;
        while (1 < matchCount) {
            if (matchCount % 2 == 1) {
                return false;
            } else {
                matchCount = matchCount / 2;
            }
        }
        return true;
    }

}

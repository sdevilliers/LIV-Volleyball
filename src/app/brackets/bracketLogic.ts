import { Cell } from "./cell";
import { Team } from "./team";
import { Round } from "./round";
import { Match } from "./match";

export class BracketLogic {
    constructor(teams: Team[]) {
        this.teams = teams;
        this.setVariables();
        //construct a neat or 'messy' bracket as required
        if (this.neat) {
            this.rounds = this.generateNeat(this.roundCount, this.firstNeatMatchCount);
            this.setNeatMatches();
        } else {
            //create a neat empty rounds array using the teams.length - extra teams
            this.rounds = this.generateNeat(this.roundCount - 1, this.firstNeatMatchCount)
            this.rounds = this.addRoundOne(this.rounds, this.extraMatches);
            this.setSeeds(this.rounds, this.neat, teams, this.extraMatches);
        }
        this.tableData = this.setTableData(this.rounds, this.tableData);
    }

    private teams: Team[];
    rounds: Round[] = [];
    roundCount: number;
    extraMatches: number;                       // the number of matches in the first round of 'messy' bracket               
    firstNeatMatchCount: number;                // machCount of the first round with a matchCount of 2^x
    neat: boolean = false;                      // whether or not the bracket has any by's
    public tableData: Cell[][];                 // dimensions: tableData[row][column] output of the bracketLogic class 

    setVariables() {                            // goes through all rounds and sets the roundCount, # of teams above the nearet 'neat' round
        //set essential variables
        this.roundCount = 1;
        // loop through all rounds until the next round could house more teams than teams.length                
        let neatTeamCount = 2;      //teams in the current round
        while (2 * neatTeamCount <= this.teams.length) {
            // matchCount doubles each round
            neatTeamCount = neatTeamCount * 2;
            // roundCount increases each round
            this.roundCount++;
        }
        this.firstNeatMatchCount = neatTeamCount / 2;
        this.extraMatches = this.teams.length - neatTeamCount;
        if (this.extraMatches == 0) {
            this.neat = true;
        } else {
            this.roundCount++;
        }
    }

    generate(teams: Team[]): void {                          //generates a non neat
        // - Start at the last round and assume team1 v. team2
        // - loop until (the precedingRound is too big for the total#ofTeams) {
        for (
            let i = 0, matchCount = 1, precedingMatchCount = matchCount * 2;
            precedingMatchCount < teams.length;
            i++ , precedingMatchCount++) {
            // - create precedingRound and put players from this round as teamOne of precedingRound matches
            this.rounds[i] = new Round(matchCount);
            // - add the extra teams in with their matching partners according to 1 v last, 1+1 v last-1 ...etc.
            // - move back a round
        }
    }

    generateRound1() {
        let matchCount = this.extraMatches;
        let gap;
        if (this.extraMatches > this.firstNeatMatchCount) {//changes the gap if the teams have to double up or not
            gap = 0;
        } else {
            gap = 2;
        }
        this.roundCount[0] = new Round(matchCount, gap, 0);
    }

    setNeatMatches() {                         //assignes the teams to the matches in a neat brackets
        for (let i = 0, j = this.teams.length - 1; i < this.rounds[0].matches.length; j-- , i++) {
            this.rounds[0].matches[i].teamOne = this.teams[i];
            this.rounds[0].matches[i].teamTwo = this.teams[j];
        }
    }

    setMatches(): Match[] {                    //reorders teams that are not given a by into matches: first vs last, first+1 vs last-1 and so on
        let matches: Match[];
        let loneTeams: number;                 //teams on their own in a match i.e. wating for match in prev round to complete
        if (this.extraMatches > this.firstNeatMatchCount) {//changes the loneTeams if the teams have to double up or not
            loneTeams = 2 * this.firstNeatMatchCount - this.extraMatches;
        } else {
            loneTeams = this.extraMatches;
        }
        for (let i = loneTeams, j = this.teams.length - 1, x = 0; i < this.teams.length / 2; x++ , j--) {
            matches[i].teamOne = this.teams[x];
            matches[i].teamTwo = this.teams[j];
        }
        return matches;
    }

    setMatchOrder() {                           // Orders the matches into 

    }


    setTableData(rounds: Round[], tableData: Cell[][]): Cell[][] {
        tableData = [];                         //set tableData to an empty array

        //creates a new cell for each cell in tableData. Rows are the container arrays with the number of rows based on the number of matches in rounds[0] 
        for (let rowidx = 0; rowidx <= rounds[0].matches[rounds[0].matches.length - 1].endRowIndex; rowidx++) {
            tableData[rowidx] = [];
            for (let colidx = 0; colidx < rounds.length; colidx++) {
                //Every cell is established with null values: teamName = " " and class = "blank"
                tableData[rowidx][colidx] = new Cell();
            }
        }

        //
        for (let round of rounds) {
            if (rounds.indexOf(round) == 0) {
                for (let match of rounds[0].matches) {
                    tableData[match.startRowIndex][0] = new Cell(match.teamOne.name, "n");
                    tableData[match.endRowIndex][0] = new Cell(match.teamTwo.name, "u");
                }
            }
            for (let match of round.matches) {
                tableData[match.startRowIndex][rounds.indexOf(round)].class = "n";
                tableData[match.endRowIndex][rounds.indexOf(round)].class = "u";
            }
        }

        tableData = this.setlines(this.neat, rounds, tableData);

        return tableData;
    }

    //adds the lines to connect the matches
    setlines(neat: boolean, rounds: Round[], tableData: Cell[][]): Cell[][] {
        //loop through all the matches that aren't empty
        for (let round of rounds) {
            for (let match of round.matches) {
                if (match.empty == false) {
                    //add lines above and below the matches
                    //length of the lines in cell units = gap two rounds ago
                    let length;
                    //except for the first 2 or 3 rounds
                    if (rounds.indexOf(round) == 1 || rounds.indexOf(round) == 0) {
                        length = 0;
                    } else if (!neat && rounds.indexOf(round) == 3) {
                        length = 0;
                    } else if (rounds.indexOf(round) >= 2) {
                        length = rounds[rounds.indexOf(round) - 2].gap;
                    }
                    //use the startRowIndex and the round index to position the line in tableData
                    //loop through each cell of the line
                    for (let i = 1; i <= length; i++) {
                        //use the startRowIndex and the round index to position the line in tableData
                        tableData[match.endRowIndex + i][rounds.indexOf(round) - 1].class += " right";
                        tableData[match.startRowIndex - i][rounds.indexOf(round) - 1].class += " right";
                    }
                }
            }
        }
        return tableData;
    }

    // assigns the teams to the matches in a 'messy' bracket
    setSeeds(rounds: Round[], neat: boolean, teams: Team[], extraMatches: number) {
        let neatRoundCount: number; // the first neat round
        if (neat) { neatRoundCount = rounds.length; } else { neatRoundCount = rounds.length - 1; }
        // - Start at the last round and assume team1 v. team2
        // - loop throu until (the first neat round) {
        let curSeeds: number[] = [1, 2];
        for (
            let i = 0, prevSeeds: number[] = [];
            i < neatRoundCount;
            i++ , curSeeds = prevSeeds
        ) {
            let first: number = curSeeds[2] + 1;
            let last: number = first + curSeeds.length - 1;

            // put players from this round as teamOne of each of the previous matches
            //fill in the teamTwo slots in prevMatches with the sequential seeds following 'lastSeed'
            for (let j = 0, k = 0; k < curSeeds.length; j += 2, k++) {
                prevSeeds[j] = curSeeds[k];
            }
            // - add the extra teams in with their matching partners according to 1 v last, 1+1 v last-1 ...etc.
            for (let j = last, k = 1; k <= curSeeds.length; j-- , k++) {
                //fills position after where 'k' is 
                prevSeeds[prevSeeds.indexOf(k) + 1] = j;
            }
            // - move back a round
        }
        let neatSeeds = curSeeds;
        // - create a messyRound to deal with the bys
        if (!neat) {
            let first: number = curSeeds[2] + 1;
            let last: number = first + curSeeds.length - 1;
            let prevSeeds: number[] = [];
            // put players from this round as teamOne of each of the previous matches
            //fill in the teamTwo slots in prevMatches with the sequential seeds following 'lastSeed'
            for (let j = 0, k = 0; k < curSeeds.length; j += 2, k++) {
                prevSeeds[j] = curSeeds[k];
            }
            // - add the extra teams in with their matching partners according to 1 v last, 1+1 v last-1 ...etc.
            for (let j = last, k = 1; k <= curSeeds.length; j-- , k++) {
                //fills position after where 'k' is 
                prevSeeds[prevSeeds.indexOf(k) + 1] = j;
            }
            let messySeeds = curSeeds;
            //keep the first (teams.length - extraMatches*2) teams where they are in neatSeeds
            //delete all the others from neatSeeds
            //delete all but those from messySeeds
            let target = teams.length - extraMatches * 2
            for (let i = 1; i <= target; i++) {
                neatSeeds.splice(neatSeeds.indexOf(i), 2);
            }

            // retrofit spacing and connecting lines
            // - convert to table
        }
    }

    generateNeat(roundCount: number, firstNeatMatchCount: number): Round[] {
        let matchCount = firstNeatMatchCount;
        let gap = 2;                                //number of cells between matches
        let smallGap = 0;
        let rounds: Round[] = [];
        for (let i = 0; i < roundCount; i++) {
            rounds[i] = new Round(matchCount, gap, smallGap);
            //update variables for the next round
            matchCount = matchCount / 2;
            // each smallGap is equal to the previous gap
            smallGap = gap;
            gap = gap * 2 + 2;
        }
        return rounds;
    }

    // creates a round for the extra matches
    addRoundOne(rounds: Round[], extraMatches: number): Round[] {
        let roundOne: Round = new Round(extraMatches, 0, 0);
        rounds.unshift(roundOne);
        return rounds;
    }
}







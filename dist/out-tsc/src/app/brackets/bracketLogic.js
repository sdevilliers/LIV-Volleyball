import { Cell } from "./cell";
import { Round } from "./round";
var BracketLogic = /** @class */ (function () {
    function BracketLogic(teams) {
        this.rounds = [];
        this.neat = false; // whether or not the bracket has any by's
        this.teams = teams;
        this.setVariables();
        //construct a neat or 'messy' bracket as required
        if (this.neat) {
            //create a neat empty rounds array using the teams.length - extra teams
            this.rounds = this.generateNeat(this.roundCount, this.firstNeatMatchCount);
            this.setNeatMatches();
        }
        else {
            this.rounds = this.generateNeat(this.roundCount - 1, this.firstNeatMatchCount);
            this.rounds = this.addRoundOne(this.rounds, this.extraMatches);
            this.setSeeds(this.rounds, this.neat, teams, this.extraMatches);
        }
        this.tableData = this.setTableData(this.rounds, this.tableData);
    }
    BracketLogic.prototype.setVariables = function () {
        //set essential variables
        this.roundCount = 1;
        // loop through all rounds until the next round could house more teams than teams.length                
        var neatTeamCount = 2; //teams in the current round
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
        }
        else {
            this.roundCount++;
        }
    };
    BracketLogic.prototype.generate = function (teams) {
        // - Start at the last round and assume team1 v. team2
        // - loop until (the precedingRound is too big for the total#ofTeams) {
        for (var i = 0, matchCount = 1, precedingMatchCount = matchCount * 2; precedingMatchCount < teams.length; i++, precedingMatchCount++) {
            // - create precedingRound and put players from this round as teamOne of precedingRound matches
            this.rounds[i] = new Round(matchCount);
            // - add the extra teams in with their matching partners according to 1 v last, 1+1 v last-1 ...etc.
            // - move back a round
        }
    };
    BracketLogic.prototype.generateRound1 = function () {
        var matchCount = this.extraMatches;
        var gap;
        if (this.extraMatches > this.firstNeatMatchCount) {
            gap = 0;
        }
        else {
            gap = 2;
        }
        this.roundCount[0] = new Round(matchCount, gap, 0);
    };
    BracketLogic.prototype.setNeatMatches = function () {
        for (var i = 0, j = this.teams.length - 1; i < this.rounds[0].matches.length; j--, i++) {
            this.rounds[0].matches[i].teamOne = this.teams[i];
            this.rounds[0].matches[i].teamTwo = this.teams[j];
        }
    };
    BracketLogic.prototype.setMatches = function () {
        var matches;
        var loneTeams; //teams on their own in a match i.e. wating for match in prev round to complete
        if (this.extraMatches > this.firstNeatMatchCount) {
            loneTeams = 2 * this.firstNeatMatchCount - this.extraMatches;
        }
        else {
            loneTeams = this.extraMatches;
        }
        for (var i = loneTeams, j = this.teams.length - 1, x = 0; i < this.teams.length / 2; x++, j--) {
            matches[i].teamOne = this.teams[x];
            matches[i].teamTwo = this.teams[j];
        }
        return matches;
    };
    BracketLogic.prototype.setMatchOrder = function () {
    };
    BracketLogic.prototype.setTableData = function (rounds, tableData) {
        tableData = []; //set tableData to an empty array
        //creates a new cell for each cell in tableData. Rows are the container arrays with the number of rows based on the number of matches in rounds[0] 
        for (var rowidx = 0; rowidx <= rounds[0].matches[rounds[0].matches.length - 1].endRowIndex; rowidx++) {
            tableData[rowidx] = [];
            for (var colidx = 0; colidx < rounds.length; colidx++) {
                //Every cell is established with null values: teamName = " " and class = "blank"
                tableData[rowidx][colidx] = new Cell();
            }
        }
        //
        for (var _i = 0, rounds_1 = rounds; _i < rounds_1.length; _i++) {
            var round = rounds_1[_i];
            if (rounds.indexOf(round) == 0) {
                for (var _a = 0, _b = rounds[0].matches; _a < _b.length; _a++) {
                    var match = _b[_a];
                    tableData[match.startRowIndex][0] = new Cell(match.teamOne.name, "n");
                    tableData[match.endRowIndex][0] = new Cell(match.teamTwo.name, "u");
                }
            }
            for (var _c = 0, _d = round.matches; _c < _d.length; _c++) {
                var match = _d[_c];
                tableData[match.startRowIndex][rounds.indexOf(round)].class = "n";
                tableData[match.endRowIndex][rounds.indexOf(round)].class = "u";
            }
        }
        tableData = this.setlines(this.neat, rounds, tableData);
        return tableData;
    };
    //adds the lines to connect the matches
    BracketLogic.prototype.setlines = function (neat, rounds, tableData) {
        //loop through all the matches that aren't empty
        for (var _i = 0, rounds_2 = rounds; _i < rounds_2.length; _i++) {
            var round = rounds_2[_i];
            for (var _a = 0, _b = round.matches; _a < _b.length; _a++) {
                var match = _b[_a];
                if (match.empty == false) {
                    //add lines above and below the matches
                    //length of the lines in cell units = gap two rounds ago
                    var length_1 = void 0;
                    //except for the first 2 or 3 rounds
                    if (rounds.indexOf(round) == 1 || rounds.indexOf(round) == 0) {
                        length_1 = 0;
                    }
                    else if (!neat && rounds.indexOf(round) == 3) {
                        length_1 = 0;
                    }
                    else if (rounds.indexOf(round) >= 2) {
                        length_1 = rounds[rounds.indexOf(round) - 2].gap;
                    }
                    //use the startRowIndex and the round index to position the line in tableData
                    //loop through each cell of the line
                    for (var i = 1; i <= length_1; i++) {
                        //use the startRowIndex and the round index to position the line in tableData
                        tableData[match.endRowIndex + i][rounds.indexOf(round) - 1].class += " right";
                        tableData[match.startRowIndex - i][rounds.indexOf(round) - 1].class += " right";
                    }
                }
            }
        }
        return tableData;
    };
    // assigns the teams to the matches in a 'messy' bracket
    BracketLogic.prototype.setSeeds = function (rounds, neat, teams, extraMatches) {
        var neatRoundCount; // the first neat round
        if (neat) {
            neatRoundCount = rounds.length;
        }
        else {
            neatRoundCount = rounds.length - 1;
        }
        // - Start at the last round and assume team1 v. team2
        // - loop throu until (the first neat round) {
        var curSeeds = [1, 2];
        for (var i = 0, prevSeeds = []; i < neatRoundCount; i++, curSeeds = prevSeeds) {
            var first = curSeeds[2] + 1;
            var last = first + curSeeds.length - 1;
            // put players from this round as teamOne of each of the previous matches
            //fill in the teamTwo slots in prevMatches with the sequential seeds following 'lastSeed'
            for (var j = 0, k = 0; k < curSeeds.length; j += 2, k++) {
                prevSeeds[j] = curSeeds[k];
            }
            // - add the extra teams in with their matching partners according to 1 v last, 1+1 v last-1 ...etc.
            for (var j = last, k = 1; k <= curSeeds.length; j--, k++) {
                //fills position after where 'k' is 
                prevSeeds[prevSeeds.indexOf(k) + 1] = j;
            }
            // - move back a round
        }
        var neatSeeds = curSeeds;
        // - create a messyRound to deal with the bys
        if (!neat) {
            var first = curSeeds[2] + 1;
            var last = first + curSeeds.length - 1;
            var prevSeeds = [];
            // put players from this round as teamOne of each of the previous matches
            //fill in the teamTwo slots in prevMatches with the sequential seeds following 'lastSeed'
            for (var j = 0, k = 0; k < curSeeds.length; j += 2, k++) {
                prevSeeds[j] = curSeeds[k];
            }
            // - add the extra teams in with their matching partners according to 1 v last, 1+1 v last-1 ...etc.
            for (var j = last, k = 1; k <= curSeeds.length; j--, k++) {
                //fills position after where 'k' is 
                prevSeeds[prevSeeds.indexOf(k) + 1] = j;
            }
            var messySeeds = curSeeds;
            //keep the first (teams.length - extraMatches*2) teams where they are in neatSeeds
            //delete all the others from neatSeeds
            //delete all but those from messySeeds
            var target = teams.length - extraMatches * 2;
            for (var i = 1; i <= target; i++) {
                neatSeeds.splice(neatSeeds.indexOf(i), 2);
            }
            // retrofit spacing and connecting lines
            // - convert to table
        }
    };
    BracketLogic.prototype.generateNeat = function (roundCount, firstNeatMatchCount) {
        var matchCount = firstNeatMatchCount;
        var gap = 2; //number of cells between matches
        var smallGap = 0;
        var rounds = [];
        for (var i = 0; i < roundCount; i++) {
            rounds[i] = new Round(matchCount, gap, smallGap);
            //update variables for the next round
            matchCount = matchCount / 2;
            // each smallGap is equal to the previous gap
            smallGap = gap;
            gap = gap * 2 + 2;
        }
        return rounds;
    };
    // creates a round for the extra matches
    BracketLogic.prototype.addRoundOne = function (rounds, extraMatches) {
        var roundOne = new Round(extraMatches, 0, 0);
        rounds.unshift(roundOne);
        return rounds;
    };
    return BracketLogic;
}());
export { BracketLogic };
//# sourceMappingURL=bracketLogic.js.map
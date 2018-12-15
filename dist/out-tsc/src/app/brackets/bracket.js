import { Round } from "./round";
var Bracket = /** @class */ (function () {
    function Bracket(teams) {
        this.rounds = [];
        this.neat = false; // whether or not the bracket has any by's
        this.teams = teams;
        this.setVariables();
        // if (this.neat) {
        this.generateNeat();
        // } else {
        //     this.generate();
        // }
    }
    Bracket.prototype.setVariables = function () {
        var neatTeamCount = 2; // runs through all rounds by matchCount
        this.roundCount = 1; // tracks the rounds
        while (2 * neatTeamCount <= this.teams.length) {
            neatTeamCount = neatTeamCount * 2; // matchCount doubles each round
            this.roundCount++; // roundCount increases each round
        }
        this.firstNeatMatchCount = neatTeamCount / 2;
        this.extraMatches = this.teams.length - 2 * this.firstNeatMatchCount; // the number of extra
        if (this.extraMatches == 0) {
            this.neat = true;
        }
        else {
            this.roundCount++;
        }
        console.log("teams.length: " + this.teams.length);
        console.log("Extra matches: " + this.extraMatches);
        console.log("First neat match count: " + this.firstNeatMatchCount);
        console.log("This bracket is neat? " + this.neat);
        console.log("Rounds in this bracket (roundCOunt): " + this.roundCount);
    };
    Bracket.prototype.generateNeat = function () {
        var matchCount = this.firstNeatMatchCount;
        var gap; //number of cells between matches
        var smallGap;
        for (var i_1 = 0; i_1 < this.roundCount; i_1++) {
            gap = Math.pow(2, i_1 + 1); //uses mathematical equation
            smallGap = 0;
            if (gap > 2) {
                smallGap = Math.pow(2, i_1);
            }
            this.rounds[i_1] = new Round(matchCount, gap, smallGap);
            matchCount = matchCount / 2;
        }
        var i = 1;
    };
    Bracket.prototype.generate = function () {
        this.generateRound1();
        var matchCount = this.rounds[0].matchCount;
        for (var i = 0; i < this.roundCount; i++) {
            var gap = 2 ^ (i + 1) - 2; //uses mathematical equation
            var smallGap = 0;
            if (gap >= 2) {
                smallGap = (gap - 2) / 4;
            }
            this.rounds[i] = new Round(matchCount, gap, smallGap);
            matchCount = matchCount / 2;
        }
    };
    Bracket.prototype.generateRound1 = function () {
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
    return Bracket;
}());
export { Bracket };
//# sourceMappingURL=bracket.js.map
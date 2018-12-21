import { Team } from "./team";
var Match = /** @class */ (function () {
    function Match(empty, id, cellIndex, teamOne, teamTwo) {
        if (empty === void 0) { empty = true; }
        if (id === void 0) { id = null; }
        if (cellIndex === void 0) { cellIndex = null; }
        if (teamOne === void 0) { teamOne = new Team(); }
        if (teamTwo === void 0) { teamTwo = new Team(); }
        this.empty = empty;
        this.matchID = id;
        this.startRowIndex = cellIndex;
        this.endRowIndex = this.startRowIndex + 1;
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
    }
    // assigns two teams based on specially ordered list of seeded teams
    Match.prototype.assignTeams = function (teams) {
        this.teamOne = teams[this.matchID * 2];
        this.teamTwo = teams[this.matchID * 2 + 1];
    };
    Match.prototype.assignSeeds = function (seed1, seed2) {
        this.teamOne.seed = seed1;
        this.teamTwo.seed = seed2;
    };
    return Match;
}());
export { Match };
//# sourceMappingURL=match.js.map
var Match = /** @class */ (function () {
    function Match(empty, id, matchIndex) {
        if (empty === void 0) { empty = true; }
        if (id === void 0) { id = null; }
        if (matchIndex === void 0) { matchIndex = null; }
        this.empty = empty;
        this.matchID = id;
        this.startRow = matchIndex * 2;
        this.endRow = this.startRow + 1;
    }
    Match.prototype.assignTeams = function (teams) {
        this.teamOne = teams[this.matchID * 2];
        this.teamTwo = teams[this.matchID * 2 + 1];
    };
    return Match;
}());
export { Match };
//# sourceMappingURL=match.js.map
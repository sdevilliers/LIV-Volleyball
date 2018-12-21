import { Match } from "./match";
var Round = /** @class */ (function () {
    function Round(matchCount, gap, smallGap) {
        if (gap === void 0) { gap = 0; }
        if (smallGap === void 0) { smallGap = 0; }
        this.matches = []; //records the match locations by index value (each index value corresponds to 2 rows of the table)
        this.gap = gap;
        this.matchCount = matchCount;
        this.smallGap = smallGap;
        this.matches = this.generateRound(gap, matchCount, smallGap);
    }
    Round.prototype.generateRound = function (gap, matchCount, smallGap) {
        var matches = [];
        var cellIndex = 0;
        cellIndex += smallGap;
        var i;
        //fills in matches separated by this round's gap width
        for (i = 0; i < matchCount - 1; i++) {
            //each match stores its position via the cellIndex
            matches[i] = new Match(false, i, cellIndex);
            cellIndex += 2;
            cellIndex += gap;
        }
        matches[i] = new Match(false, i, cellIndex);
        cellIndex += smallGap;
        return matches;
    };
    Round.prototype.isNeat = function () {
        var matchCount = this.matches.length;
        while (1 < matchCount) {
            if (matchCount % 2 == 1) {
                return false;
            }
            else {
                matchCount = matchCount / 2;
            }
        }
        return true;
    };
    return Round;
}());
export { Round };
//# sourceMappingURL=round.js.map
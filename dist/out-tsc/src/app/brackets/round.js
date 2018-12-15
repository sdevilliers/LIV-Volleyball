import { Match } from "./match";
var Round = /** @class */ (function () {
    function Round(matchCount, gap, smallGap) {
        this.matches = []; //records the match locations by index value (each index value corresponds to 2 rows of the table)
        this.currentIndex = 0; //tracks the current index throughout the generation process
        this.gap = gap;
        this.matchCount = matchCount;
        this.smallGap = smallGap;
        this.generateRound();
    }
    Round.prototype.generateRound = function () {
        this.fillGap(this.smallGap);
        var i;
        for (i = 0; i < this.matchCount - 1; i++) {
            this.matches[this.currentIndex] = new Match(false, i, this.currentIndex);
            this.currentIndex++;
            this.fillGap(this.gap);
        }
        this.matches[this.currentIndex] = new Match(false, i, this.currentIndex);
        this.fillGap(this.smallGap);
    };
    Round.prototype.isNeat = function (length) {
        var teamCount = length;
        while (1 < teamCount) {
            if (teamCount % 2 == 1) {
                return false;
            }
            else {
                teamCount = teamCount / 2;
            }
        }
        return true;
    };
    Round.prototype.fillGap = function (gapLength) {
        if (gapLength > 0) {
            this.currentIndex += gapLength - 1;
        }
        else if (gapLength < 0) {
            console.log("round.fillgap() recieved a negative gap: " + gapLength);
        }
    };
    return Round;
}());
export { Round };
//# sourceMappingURL=round.js.map
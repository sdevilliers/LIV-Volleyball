import { Bracket } from "./bracket";
describe('Bracket', function () {
    var bracket;
    beforeEach(function () {
        var teams;
        for (var i = 0; i < 7; i++) {
            teams[i].name = "Team" + i;
        }
        bracket = new Bracket(teams);
    });
    it('should create', function () {
        expect(bracket).toBeTruthy();
    });
    it('should set the variables', function () {
        expect(bracket.extraMatches).toEqual(0);
        expect(bracket.roundCount).toEqual(4);
        expect(bracket.neat).toEqual(true);
        expect(bracket.rounds[0].matchCount).toEqual(8);
    });
});
//# sourceMappingURL=bracket.spec.js.map
var Team = /** @class */ (function () {
    function Team(seed, name, players, captain) {
        if (seed === void 0) { seed = -1; }
        if (name === void 0) { name = ""; }
        if (players === void 0) { players = [""]; }
        if (captain === void 0) { captain = ""; }
        this.name = name;
        this.players = players;
        this.seed = seed;
        this.captain = captain;
    }
    return Team;
}());
export { Team };
//# sourceMappingURL=team.js.map
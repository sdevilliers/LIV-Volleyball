import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bracket } from "./bracketLogic";
import { ITeam } from "./team";

describe('Bracket', () => {
    let bracket: Bracket;
    beforeEach(() => {
        let teams: ITeam[];
        for (let i = 0; i < 7; i++) {
            teams[i].name = "Team" + i;
        }
        bracket = new Bracket(teams);
    });

    it('should create', () => {
        expect(bracket).toBeTruthy();
    });

    // it('should set the variables', () => {
    //     expect(bracket.extraMatches).toEqual(0);
    //     expect(bracket.roundCount).toEqual(4);
    //     expect(bracket.neat).toEqual(true);
    //     expect(bracket.rounds[0].matchCount).toEqual(8);
    // });

});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { BracketLogic } from './bracketLogic';
import { Team } from './team';
var BracketsComponent = /** @class */ (function () {
    function BracketsComponent() {
    }
    BracketsComponent.prototype.createBracket = function (teamsLength) {
        //sets the teams array -- this code will be moved later
        var teams = [];
        //remember after move to ensure that teams cannot be less than 2
        for (var i = 0; i < teamsLength; i++) {
            teams[i] = new Team;
            teams[i].name = "Team" + (i + 1);
        }
        this.bracket = new BracketLogic(teams);
    };
    BracketsComponent.prototype.ngOnInit = function () {
    };
    BracketsComponent = __decorate([
        Component({
            selector: 'vb-brackets',
            templateUrl: './brackets.component.html',
            styleUrls: ['./brackets.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], BracketsComponent);
    return BracketsComponent;
}());
export { BracketsComponent };
//# sourceMappingURL=brackets.component.js.map
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
import { NavController } from 'ionic-angular';
import { AnswerService } from '../../providers/answer-service';
var FinishPage = (function () {
    function FinishPage(navCtrl, answerService) {
        this.navCtrl = navCtrl;
        this.answerService = answerService;
    }
    FinishPage.prototype.ionViewDidLoad = function () {
        // TODO: Send data to server
        console.log(this.answerService.answers);
    };
    FinishPage.prototype.handleClosePage = function () {
        this.navCtrl.pop();
    };
    return FinishPage;
}());
FinishPage = __decorate([
    Component({
        selector: 'page-finish',
        templateUrl: 'finish.html'
    }),
    __metadata("design:paramtypes", [NavController,
        AnswerService])
], FinishPage);
export { FinishPage };
//# sourceMappingURL=finish.js.map
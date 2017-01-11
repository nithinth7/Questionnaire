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
import { NavController, LoadingController } from 'ionic-angular';
import { QuestionsPage } from '../questions/questions';
import { QuestionService } from '../../providers/question-service';
import { AnswerService } from '../../providers/answer-service';
var HomePage = (function () {
    function HomePage(navCtrl, loadingCtrl, questionService, answerService) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.questionService = questionService;
        this.answerService = answerService;
        this.isLoading = true;
        this.isOpenPageClicked = false;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.questionService.get()
            .delay(2000)
            .subscribe(function (questions) { return _this.serviceReady(questions); }, function (error) { return _this.handleError(error); });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.answerService.reset();
    };
    HomePage.prototype.handleOpenPage = function () {
        this.isOpenPageClicked = true;
        if (this.isLoading) {
            this.startLoader();
        }
        else {
            this.openPage();
        }
    };
    HomePage.prototype.handleError = function (error) {
        console.error(error);
        if (this.loader) {
            this.loader.dismissAll();
        }
    };
    HomePage.prototype.serviceReady = function (questions) {
        this.questions = questions;
        this.isLoading = false;
        if (this.isOpenPageClicked) {
            this.openPage();
        }
    };
    HomePage.prototype.startLoader = function () {
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true
        }).present();
    };
    HomePage.prototype.openPage = function () {
        this.navCtrl.push(QuestionsPage, this.questions);
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController,
        LoadingController,
        QuestionService,
        AnswerService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map
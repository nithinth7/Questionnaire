var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, ViewController, App } from 'ionic-angular';
import { AnswerService } from '../../providers/answer-service';
import { FinishPage } from '../finish/finish';
var QuestionsPage = (function () {
    function QuestionsPage(navCtrl, navParams, viewCtrl, appCtrl, answerService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.appCtrl = appCtrl;
        this.answerService = answerService;
        this.progress = 0;
        this.currentQuestion = 0;
        // TODO: gather text variables in one place. get values from server?
        this.txtValues = {
            next: 'NEXT',
            previous: 'PREVIOUS',
            finish: 'FINISH',
            close: 'CLOSE',
        };
        this.nextBtTxt = this.txtValues.next;
        this.previousBtTxt = this.txtValues.close;
        this.isNextBtDisabled = true;
        this.isPreviousBtVisible = false;
        this.iconValues = {
            previous: 'ios-arrow-back',
            close: 'close-circle',
        };
        this.iconPrevious = this.iconValues.close;
    }
    QuestionsPage.prototype.ionViewDidLoad = function () {
        this.questions = this.navParams.data;
        this.questionsContainerEl = this.questionsContainerRef.nativeElement;
        this.setCurrentQuestion();
    };
    QuestionsPage.prototype.setCurrentQuestion = function (value) {
        if (value === void 0) { value = 0; }
        var min = !(this.currentQuestion + value < 0);
        var max = !(this.currentQuestion + value >= this.questions.length);
        var finish = (this.currentQuestion + value === this.questions.length);
        var back = (this.currentQuestion + value === -1);
        if (min && max) {
            this.content.scrollToTop(200);
            this.currentQuestion = this.currentQuestion + value;
            this.setProgress();
            this.questionsContainerEl.style.transform =
                "translateX(-" + this.currentQuestion * 100 + "%)";
            this.iconPrevious = !this.currentQuestion
                ? this.iconValues.close
                : this.iconValues.previous;
            this.previousBtTxt = !this.currentQuestion
                ? this.txtValues.close
                : this.txtValues.previous;
            this.nextBtTxt = this.currentQuestion === this.questions.length - 1
                ? this.txtValues.finish
                : this.txtValues.next;
            this.setNextDisabled();
        }
        else if (finish) {
            this.navCtrl.push(FinishPage);
            this.navCtrl.removeView(this.viewCtrl);
        }
        else if (back) {
            this.navCtrl.pop();
        }
    };
    QuestionsPage.prototype.setProgress = function () {
        var tick = Math.ceil(100 / this.questions.length);
        var percent = Math.ceil(this.currentQuestion * 100 / this.questions.length);
        this.progress = percent + tick;
    };
    QuestionsPage.prototype.checkAnswer = function () {
        var id = this.questions[this.currentQuestion].id;
        return this.answerService.check(id);
    };
    QuestionsPage.prototype.setNextDisabled = function () {
        this.isNextBtDisabled = !this.checkAnswer();
    };
    QuestionsPage.prototype.nextQuestion = function () {
        if (this.checkAnswer()) {
            this.setCurrentQuestion(1);
        }
    };
    QuestionsPage.prototype.onAnswer = function (event) {
        if (event.id) {
            this.answerService.add(event);
            this.setNextDisabled();
        }
    };
    QuestionsPage.prototype.previousQuestion = function () {
        this.setCurrentQuestion(-1);
    };
    return QuestionsPage;
}());
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], QuestionsPage.prototype, "content", void 0);
__decorate([
    ViewChild('questionsContainer'),
    __metadata("design:type", ElementRef)
], QuestionsPage.prototype, "questionsContainerRef", void 0);
QuestionsPage = __decorate([
    Component({
        selector: 'page-questions',
        templateUrl: 'questions.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ViewController,
        App,
        AnswerService])
], QuestionsPage);
export { QuestionsPage };
//# sourceMappingURL=questions.js.map
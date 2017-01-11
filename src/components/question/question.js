var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionType } from '../../models/question';
var QuestionComponent = (function () {
    function QuestionComponent() {
        this.answer = new EventEmitter();
    }
    QuestionComponent.prototype.onValueChange = function (event) {
        // on init the component fires the event once
        if (event === undefined)
            return;
        switch (this.question.type) {
            case QuestionType.radio:
            case QuestionType.range:
            case QuestionType.slider:
                this.value = event;
                break;
            case QuestionType.audio:
                // TODO: add audio file reference to send
                break;
        }
        this.answer.emit({
            id: this.question.id,
            value: this.value
        });
    };
    return QuestionComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], QuestionComponent.prototype, "question", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], QuestionComponent.prototype, "answer", void 0);
QuestionComponent = __decorate([
    Component({
        selector: 'question',
        templateUrl: 'question.html'
    }),
    __metadata("design:paramtypes", [])
], QuestionComponent);
export { QuestionComponent };
//# sourceMappingURL=question.js.map
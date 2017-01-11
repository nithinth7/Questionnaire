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
var uniqueID = 0;
var RadioInputComponent = (function () {
    function RadioInputComponent() {
        this.valueChange = new EventEmitter();
        this.value = null;
        this.uniqueID = uniqueID++;
        this.name = "radio-input-" + this.uniqueID;
        this.items = Array();
    }
    RadioInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.responses.map(function (item, i) {
            _this.items.push({
                id: "radio-" + _this.uniqueID + "-" + i,
                response: item.response,
                value: item.score
            });
        });
    };
    RadioInputComponent.prototype.onInputChange = function (event) {
        this.valueChange.emit(+event.target.value);
    };
    return RadioInputComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], RadioInputComponent.prototype, "valueChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], RadioInputComponent.prototype, "responses", void 0);
RadioInputComponent = __decorate([
    Component({
        selector: 'radio-input',
        templateUrl: 'radio-input.html'
    }),
    __metadata("design:paramtypes", [])
], RadioInputComponent);
export { RadioInputComponent };
//# sourceMappingURL=radio-input.js.map
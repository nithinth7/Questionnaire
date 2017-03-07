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
var SliderInputComponent = (function () {
    function SliderInputComponent() {
        this.valueChange = new EventEmitter();
        this.min = 0;
        this.max = 100;
        this.step = 10;
        this.value = null;
    }
    SliderInputComponent.prototype.ngOnInit = function () { };
    SliderInputComponent.prototype.onInputChange = function () {
        this.valueChange.emit(this.value);
    };
    return SliderInputComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SliderInputComponent.prototype, "valueChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SliderInputComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SliderInputComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SliderInputComponent.prototype, "step", void 0);
SliderInputComponent = __decorate([
    Component({
        selector: 'slider-input',
        templateUrl: 'slider-input.html'
    }),
    __metadata("design:paramtypes", [])
], SliderInputComponent);
export { SliderInputComponent };
//# sourceMappingURL=slider-input.js.map
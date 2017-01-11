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
var RangeInputComponent = (function () {
    function RangeInputComponent() {
        this.valueChange = new EventEmitter();
        this.min = 1;
        this.max = 10;
        this.value = null;
        this.uniqueID = uniqueID++;
        this.name = "range-input-" + this.uniqueID;
        this.items = Array();
    }
    RangeInputComponent.prototype.ngOnInit = function () {
        for (var i = this.min, ii = this.max; i <= ii; i++) {
            this.items.push({
                id: "range-" + this.uniqueID + "-" + i,
                value: i
            });
        }
    };
    RangeInputComponent.prototype.onInputChange = function (event) {
        this.valueChange.emit(+event.target.value);
    };
    return RangeInputComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], RangeInputComponent.prototype, "valueChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], RangeInputComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], RangeInputComponent.prototype, "max", void 0);
RangeInputComponent = __decorate([
    Component({
        selector: 'range-input',
        templateUrl: 'range-input.html'
    }),
    __metadata("design:paramtypes", [])
], RangeInputComponent);
export { RangeInputComponent };
//# sourceMappingURL=range-input.js.map
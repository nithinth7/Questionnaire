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
import * as opensmile from 'G:/IonicProjects/RADAR-Questionnaire-master/plugins/plugin.opensmile/www/opensmile';
/*
  Generated class for the AudioInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
var AudioInputComponent = (function () {
    function AudioInputComponent() {
        console.log('Hello AudioInput Component');
        this.text = 'Hello World';
        this.fname = 'oepnsmile.csv';
        this.fpath = 'opensmile';
    }
    AudioInputComponent.prototype.success = function (message) {
        alert(message);
    };
    AudioInputComponent.prototype.failure = function () {
        alert("Error calling OpenSmile Plugin");
    };
    AudioInputComponent.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    AudioInputComponent.prototype.start = function () {
        /*cordova.plugins.backgroundMode.setDefaults({
            title: 'My App Name',
            text: 'Active in background...'
        });
        cordova.plugins.backgroundMode.enable();*/
        opensmile.start(this.fname, this.fpath, this.success, this.failure);
        alert('opensmile started');
    };
    AudioInputComponent.prototype.stop = function () {
        cordova.plugins.opensmile.stop("Stop", this.success, this.failure);
        alert('opensmile stoped');
    };
    return AudioInputComponent;
}());
AudioInputComponent = __decorate([
    Component({
        selector: 'audio-input',
        templateUrl: 'audio-input.html'
    }),
    __metadata("design:paramtypes", [])
], AudioInputComponent);
export { AudioInputComponent };
//# sourceMappingURL=audio-input.js.map
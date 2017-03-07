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
import { MediaPlugin, Device } from 'ionic-native';
import * as opensmile from '../../../plugins/plugin.opensmile/www/opensmile'; //file path to opensmile.js
import { AnswerService } from '../../providers/answer-service';
//import { Answer } from '../../models/answer';
import { QuestionsPage } from '../../pages/questions/questions';
/*
  Generated class for the AudioInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
var AudioInputComponent = (function () {
    function AudioInputComponent(questions, answerService) {
        this.questions = questions;
        this.answerService = answerService;
        this.valueChange = new EventEmitter();
        this.configFile = '';
        this.compressionLevel = 0;
        this.qid = '';
        this.value = null;
        this.media = null;
        this.platform = false;
        //questions: QuestionsPage;
        this.permission = false;
        //permissions = cordova.plugins.permissions;
        //ans: Answer = null;
        //answerService: AnswerService;
        this.answer = {
            id: null,
            value: null
        };
        if (Device.platform == 'Android') {
            this.text = 'Start Recording';
            var fs = cordova.file.externalDataDirectory;
            var path = fs;
            path = path.substring(7, (path.length - 1));
            this.fpath = path;
            this.recording = false;
            this.platform = true;
        }
        else {
        }
    }
    AudioInputComponent.prototype.ngOnInit = function () {
        //alert('qid:' + this.qid);
        if (Device.platform == 'Android') {
            if (!this.answerService.check(this.qid)) {
                this.answer.id = this.qid;
                this.answer.value = 'Not Recorded yet';
                this.answerService.add(this.answer);
            }
        }
    };
    AudioInputComponent.prototype.startRecording = function (fullPath) {
        this.media = new MediaPlugin(fullPath);
        this.media.startRecord();
    };
    AudioInputComponent.prototype.stopRecording = function () {
        this.media.stopRecord();
    };
    AudioInputComponent.prototype.success = function (message) { };
    AudioInputComponent.prototype.failure = function () {
        alert('Error calling OpenSmile Plugin');
    };
    AudioInputComponent.prototype.start = function () {
        this.permission = this.questions.getPermission();
        //alert('Audio-input Permission:' + this.permission);
        if (this.platform && this.permission == true) {
            if (this.recording == false) {
                var displayDate = new Date();
                var date = displayDate.toISOString();
                this.name = 'audio' + this.qid + '-' + date;
                this.recording = true;
                this.text = 'Stop Recording';
                if (this.compressionLevel == 1) {
                    this.fname = this.name + '-opensmile.csv';
                    opensmile.start(this.fname, this.configFile, this.success, this.failure);
                }
                else {
                    this.fname = this.name + '.mp3';
                    var fullPath = this.fpath + "/" + this.fname;
                    this.startRecording(fullPath);
                }
            }
            else if (this.recording == true) {
                this.value = this.fpath + "/" + this.fname;
                this.recording = false;
                this.text = 'Start Recording';
                if (this.compressionLevel == 1) {
                    opensmile.stop('Stop', this.success, this.failure);
                }
                else {
                    this.stopRecording();
                }
                //this.ans.id = this.qid;
                //this.ans.value = this.value;
                //this.answerService.add(this.answer);
                this.valueChange.emit(this.value);
            }
        }
        else {
            this.value = 'Permission not granted';
            this.valueChange.emit(this.value);
            alert('Permission not granted; Go to next question');
        }
    };
    AudioInputComponent.prototype.isRecording = function () {
        return this.recording;
    };
    AudioInputComponent.prototype.stop = function () {
        opensmile.stop('Stop', this.success, this.failure);
        alert('opensmile stoped');
    };
    return AudioInputComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AudioInputComponent.prototype, "valueChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AudioInputComponent.prototype, "configFile", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], AudioInputComponent.prototype, "compressionLevel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AudioInputComponent.prototype, "qid", void 0);
AudioInputComponent = __decorate([
    Component({
        selector: 'audio-input',
        templateUrl: 'audio-input.html'
    }),
    __metadata("design:paramtypes", [QuestionsPage,
        AnswerService])
], AudioInputComponent);
export { AudioInputComponent };
//# sourceMappingURL=audio-input.js.map
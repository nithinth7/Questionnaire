import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaPlugin, Device } from 'ionic-native';
import * as cordova1 from 'cordova';
import * as opensmile from '../../../plugins/plugin.opensmile/www/opensmile'; //file path to opensmile.js
import { AnswerService } from '../../providers/answer-service'
//import { Answer } from '../../models/answer';
import { QuestionsPage } from '../../pages/questions/questions';
declare var cordova: any;
declare var window: any;
/*
  Generated class for the AudioInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
    selector: 'audio-input',
    templateUrl: 'audio-input.html'
})
export class AudioInputComponent implements OnInit {
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() configFile: string = '';
    @Input() compressionLevel: number = 0;
    @Input() qid: string = '';
    text: string;
    fname: string;
    name: string;
    fpath: string;
    recording: boolean;
    value: string = null;
    configfile: string;
    compression: number;
    media: MediaPlugin = null;
    platform: boolean = false;
    answer_b64: string = null;
    //questions: QuestionsPage;
    permission: boolean = false;
    //permissions = cordova.plugins.permissions;
    //ans: Answer = null;
    //answerService: AnswerService;
    answer = {
        id: null,
        value: null
    }
    ngOnInit() {
        //alert('qid:' + this.qid);
        if (Device.platform == 'Android') {
            if (!this.answerService.check(this.qid)) {
                this.answer.id = this.qid;
                this.answer.value = 'Not Recorded yet';
                this.answerService.add(this.answer);
            }
        }
    }

    constructor(public questions: QuestionsPage,
        private answerService: AnswerService) {
        if (Device.platform == 'Android') {
            this.text = 'Start Recording';
            const fs: string = cordova.file.externalDataDirectory;
            var path: string = fs;
            path = path.substring(7, (path.length - 1))
            this.fpath = path;
            this.recording = false;
            this.platform = true;
        } else {

        }
    }
    startRecording(fullPath) {
        this.media = new MediaPlugin(fullPath);
        this.media.startRecord();
    }

    stopRecording() {
        this.media.stopRecord();
    }

    success(message) {
        //alert('Message:' + message);
    }

    failure() {
        alert('Error calling OpenSmile Plugin');
    }

    start() {
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
                } else {
                    this.fname = this.name + '.mp3';
                    var fullPath = this.fpath + "/" + this.fname;
                    this.startRecording(fullPath);
                }
            } else if (this.recording == true) {
                this.value = this.fpath + "/" + this.fname;
                this.recording = false;
                this.text = 'Start Recording';
                if (this.compressionLevel == 1) {
                    opensmile.stop('Stop', this.success, this.failure);
                    this.readFile(this.fpath, 'test50.bin');
                    //this.valueChange.emit(this.answer_b64);
                } else {
                    this.stopRecording();
                    this.valueChange.emit(this.value);
                }
            }
        } else {
            this.value = 'Permission not granted';
            this.valueChange.emit(this.value);
            alert('Permission not granted; Go to next question');
        }
    }
    readFile(file_path, file_name) {
        var ans_b64 = null;
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + '/' + file_name, (fileEntry) => {
                fileEntry.file( (file) => {
                    var reader = new FileReader();

                    reader.onloadend = (e: any) => {
                        ans_b64 = e.target.result;
                        this.answer_b64 = e.target.result;
                        this.valueChange.emit(this.answer_b64);
                    };
                    reader.readAsDataURL(file);
                }, errorCallback);

        }, errorCallback);
        function errorCallback(error) {
            alert("ERROR: " + error.code)
        }
}
    isRecording() {
        return this.recording;
    }

    stop() {
        opensmile.stop('Stop', this.success, this.failure);
        alert('opensmile stoped');
    }
}

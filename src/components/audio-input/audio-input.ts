import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaPlugin, Device } from 'ionic-native';
import * as cordova1 from 'cordova';
import * as opensmile from '../../../plugins/plugin.opensmile/www/opensmile'; //file path to opensmile.js
//import { AnswerService } from '../../providers/answer-service'
import { Answer } from '../../models/answer';
declare var cordova: any;
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
    //ans: Answer = null;
    //answerService: AnswerService;
    answer = {
        id: null,
        value: null
    }
    ngOnInit() { }

    constructor() {
        if (Device.platform == 'Android') {
            console.log('Hello AudioInput Component');
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

    success(message) { }

    failure() {
        alert('Error calling OpenSmile Plugin');
    }

    start() {
        if (this.platform) {
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
                } else {
                    this.stopRecording();
                }
                //this.ans.id = this.qid;
                //this.ans.value = this.value;
                //this.answerService.add(this.answer);
                this.valueChange.emit(this.value);
            }
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

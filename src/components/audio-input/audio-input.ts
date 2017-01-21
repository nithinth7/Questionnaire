import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as cordova1 from 'cordova';
import * as opensmile from 'G:/IonicProjects/RADAR-Questionnaire-master/plugins/plugin.opensmile/www/opensmile';
declare var cordova: any;
//declare var navigator: any;
let uniqueID: number = 0;

/*
  Generated class for the AudioInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'audio-input',
  templateUrl: 'audio-input.html'
})
export class AudioInputComponent implements OnInit{
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() configFile: string = "";
    @Input() compressionLevel: number = 0;
    text: string;
    fname: string;
    fpath: string;
    recording: boolean;
    value: string = null;
    uniqueID: number = uniqueID++;
    configfile: string;
    compression: number;

    ngOnInit() {
        this.configfile = this.configFile;
        this.compression = this.compressionLevel;
        alert(this.configFile + ":" + this.compressionLevel);
    }
  constructor() {
    console.log('Hello AudioInput Component');
    this.text = 'Start Recording';
    this.fname = 'opensmile' + uniqueID + '.csv';
    const fs: string = cordova.file.externalDataDirectory;
    var path: string = fs;
    path = path.substring(7, (path.length - 1))
    this.fpath = path;
    this.value = this.fpath + "/" +this.fname;
    this.recording = false;
    //alert(this.configFile + ":" + this.compressionLevel);
    //var pname: string = cordova1.getActivity().getPackageName();
    //this.fpath = '/Android/data/' + pname + '/ files';
    //alert(pname);//+ ":fpath:" + this.fpath);
  }

    success(message) {
    alert(message);
    }

    failure() {
    alert("Error calling OpenSmile Plugin");
    }
    delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
    start() {
        if (this.recording == false) {
            this.recording = true;
            this.text = 'Stop Recording';
            alert("Start" + this.configFile + ":" + this.compressionLevel + "config&compression" + this.configfile + ":" + this.compression);
            if (this.compression == 1) {
                opensmile.start(this.fname, this.configfile, this.success, this.failure);
            } else {
                alert('Audio recording started');
            }
        } else if (this.recording == true) {
            //this.value = 1;
            this.recording = false;
            this.text = 'Start Recording';
            if (this.compression == 1) {
                opensmile.stop("Stop", this.success, this.failure);
            } else {
                alert('Audio recording stopped');
            }
            this.valueChange.emit(this.value);
        }
    }
    isRecording() {
        return this.recording;
    }
    stop() {
        opensmile.stop("Stop", this.success, this.failure);
        alert('opensmile stoped');
    }
}

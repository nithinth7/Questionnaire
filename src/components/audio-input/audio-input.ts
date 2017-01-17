import { Component } from '@angular/core';
import * as cordova1 from 'cordova';
import * as opensmile from 'G:/IonicProjects/RADAR-Questionnaire-master/plugins/plugin.opensmile/www/opensmile';
declare var cordova: any;
//declare var navigator: any;

/*
  Generated class for the AudioInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'audio-input',
  templateUrl: 'audio-input.html'
})
export class AudioInputComponent {

    text: string;
    fname: string;
    fpath: string;
    recording: boolean;

  constructor() {
    console.log('Hello AudioInput Component');
    this.text = 'Start Recording';
    this.fname = 'opensmile.csv';
    const fs: string = cordova.file.externalDataDirectory;
    var path: string = fs;
    path = path.substring(7, (path.length - 1))
    this.fpath = path;
    this.recording = false;
    //alert(this.fpath);
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
            opensmile.start(this.fname, this.fpath, this.success, this.failure);
            alert('opensmile started:' + this.fpath + ':');
        } else if (this.recording == true) {
            this.recording = false;
            this.text = 'Start Recording';
            opensmile.stop("Stop", this.success, this.failure);
            alert('opensmile stoped');
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

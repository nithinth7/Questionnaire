import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnswerService } from '../../providers/answer-service';

declare var cordova: any;
declare var window: any;

@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html'
})
export class FinishPage {
    answers: String;
  constructor(
    public navCtrl: NavController,
    private answerService: AnswerService
  ) {
  }

  ionViewDidLoad() {
      // TODO: Send data to server
      var answ;
      for (let ans in this.answerService.answers) {
          //console.log(ans + ':' + this.answerService.answers[ans]);
          this.answers += ans;
          this.answers += ':';
          this.answers += this.answerService.answers[ans];
          this.answers += '\n';
          //alert('Answer:' + ans + ':' + this.answerService.answers[ans]);
      }
      alert('this.answers:' + this.answers);
      this.writeFile('answers.txt', this.answers);
  }
  writeFile(fileName, data) {
          window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (directoryEntry) {
              //alert('in resolveLocalFileSystemURL');
              directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                  //alert("fileEntry is file?" + fileEntry.isFile.toString() + ' :' + fileEntry.toURL());
                  //alert('in resolveLocalFileSystemURL');
                  fileEntry.createWriter(function (fileWriter) {
                      //alert('in createWriter');
                      fileWriter.onwriteend = function (e) {
                          // for real-world usage, you might consider passing a success callback
                          //alert('Write of file "' + fileName + '"" completed.');
                      };

                      fileWriter.onerror = function (e) {
                          // you could hook this up with our global error handler, or pass in an error callback
                          alert('Write failed: ' + e.toString());
                      };

                      var blob = new Blob([data], { type: 'text/plain' });
                      fileWriter.write(blob);
                  }, errorCallback);
              }, errorCallback);
          }, errorCallback);
      function errorCallback(error) {
          alert("ERROR: " + error.code)
      }
}

  handleClosePage() {
    this.navCtrl.pop();
  }

}

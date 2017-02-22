import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnswerService } from '../../providers/answer-service';

@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html'
})
export class FinishPage {

  constructor(
    public navCtrl: NavController,
    private answerService: AnswerService
  ) {
  }

  ionViewDidLoad() {
    // TODO: Send data to server
      for (let ans in this.answerService.answers) {
          console.log(ans + ':' + this.answerService.answers[ans]);
          alert('Answer:' + ans + ':' + this.answerService.answers[ans]);
      }
  }

  handleClosePage() {
    this.navCtrl.pop();
  }

}
